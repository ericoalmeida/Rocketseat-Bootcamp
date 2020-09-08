import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {Feather, FontAwesome} from '@expo/vector-icons';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Details(){
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá, ${incident.name}. Gostaria de ajudá-los`;

  function goBack(){
    navigation.navigate('Incident');
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: ['ericoalmeida.suporte@gmail.com'],
      body: message
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={logo} />

        <TouchableOpacity onPress={goBack}> 
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>

      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
       <Text style={styles.incidentValue}>{
         Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)
       }</Text>
      </View>


      <View style={styles.contact}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        
        <View style={styles.actionView}>
        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
          <FontAwesome name="whatsapp" size={22} color="#fff"/>
          <Text style={styles.actionText}>Whatsapp</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.action} onPress={sendMail}>
          <Feather name="mail" size={22} color="#fff"/>
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}