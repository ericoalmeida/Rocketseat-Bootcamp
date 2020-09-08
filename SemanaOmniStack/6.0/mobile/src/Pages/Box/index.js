import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {formatDistanceToNow} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import ImagePicker from 'react-native-image-picker';
import rnfs from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import socket from 'socket.io-client';

import api from '../../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export default class Box extends Component {
  state = {box: {}};

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    this.subscribeToNewFiles(box);

    const response = await api.get(`/boxes/${box}`);

    this.setState({box: response.data});
  }

  subscribeToNewFiles = idBox => {
    const io = socket('https://ergbox.herokuapp.com');

    io.emit('connectRoom', idBox);

    io.on('file', data => {
      this.setState({
        box: {...this.state.box, files: [data, ...this.state.box.files]},
      });
    });
  };

  uploadFiles = () => {
    ImagePicker.launchImageLibrary({}, async upload => {
      if (upload.error) {
        console.log('Error');
      } else if (upload.didCancel) {
        console.log('cancel');
      } else {
        const data = new FormData();

        //Para sistemas iOS e necessário trocar a extensao de .heic para .jpg
        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        api.post(`boxes/${this.state.box._id}/files`, data);
      }
    });
  };

  openFile = async file => {
    try {
      const filePath = `${rnfs.DocumentDirectoryPath}/${file.title}`;

      await rnfs.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (error) {
      console.log('Erro');
    }
  };

  renderItemDaLista = ({item}) => (
    <TouchableOpacity onPress={() => this.openFile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#a5cfff" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>

      <Text style={styles.fileDate}>
        Há{' '}
        {formatDistanceToNow(new Date(item.createdAt), {
          locale: pt,
        })}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{this.state.box.title}</Text>

        <FlatList
          style={styles.list}
          data={this.state.box.files}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={this.renderItemDaLista}
        />

        <TouchableOpacity style={styles.fab} onPress={this.uploadFiles}>
          <Icon name="cloud-upload" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}
