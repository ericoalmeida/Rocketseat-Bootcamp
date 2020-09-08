import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/apiGitHub';

import {
  Container,
  Formulario,
  TiUsuario,
  SbSalvarUsuario,
  FlUsuarios,
  VwUsuario,
  ImAvatar,
  TxNome,
  TxBio,
  SbPerfilUsuario,
  TxPerfilUsuario,
} from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      novoUsuario: '',
      usuarios: [],
      carregando: false,
    };
  }

  async componentDidMount() {
    const usuarios = await AsyncStorage.getItem('usuarios');

    if (usuarios) {
      this.setState({ usuarios: JSON.parse(usuarios) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { usuarios } = this.state;

    if (prevState.usuarios !== usuarios) {
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }

  onAdicionarUsuario = async () => {
    const { usuarios, novoUsuario } = this.state;

    this.setState({ carregando: true });

    const response = await api.get(`/users/${novoUsuario}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      usuarios: [...usuarios, data],
      novoUsuario: '',
      carregando: false,
    });

    Keyboard.dismiss();
  };

  AcessarTelaUsuario = usuario => {
    const { navigation } = this.props;

    navigation.navigate('User', { usuario });
  };

  render() {
    const { usuarios, novoUsuario, carregando } = this.state;

    return (
      <Container>
        <Formulario>
          <TiUsuario
            autoCorrect={false}
            autoCapitalize="none"
            placeHolder="Adicionar usuário"
            value={novoUsuario}
            onChangeText={text => this.setState({ novoUsuario: text })}
            returnKeyType="send"
            onSubmitEditing={this.onAdicionarUsuario}
          />

          <SbSalvarUsuario
            carregando={carregando}
            onPress={this.onAdicionarUsuario}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SbSalvarUsuario>
        </Formulario>

        <FlUsuarios
          data={usuarios}
          keyExtractor={usuario => usuario.login}
          renderItem={({ item }) => (
            <VwUsuario>
              <ImAvatar source={{ uri: item.avatar }} />
              <TxNome>{item.name}</TxNome>
              <TxBio>{item.bio}</TxBio>

              <SbPerfilUsuario onPress={() => this.AcessarTelaUsuario(item)}>
                <TxPerfilUsuario>Ver Perfil</TxPerfilUsuario>
              </SbPerfilUsuario>
            </VwUsuario>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Usuários',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
