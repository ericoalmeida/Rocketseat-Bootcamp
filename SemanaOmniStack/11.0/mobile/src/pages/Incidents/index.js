import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View,  FlatList,  Image, Text, TouchableOpacity} from 'react-native';

import logo from '../../assets/logo.png';
import api from '../../services/api';


import styles from './styles';

export default function Incidents(){
  const [total, setTotal ] = useState(0);
  const [incidents, setIncidents ] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)


  const navigation = useNavigation();

  function navigateToDetails(incident){
    navigation.navigate('Detail', {incident});
  }

  async function loadIncidents(){
    if (loading){
      return;
    }

    if (total > 0 && incidents.length === total){
      return;
    }

    setLoading(true)

    const response = await api.get('/incidents',{
      params: {page}
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);

    
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <Text style={styles.headerText} >
          Total de  <Text style={styles.headerTextCases}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um caso abaixo e salve o dia!</Text>

     
     <FlatList 
      data={incidents}
      style={styles.incidentsList}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={true}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      renderItem={({item}) => {
        return (
          <View style={styles.incident}>
            <Text style={styles.property}>ONG:</Text>
            <Text style={styles.value}>{item.name}</Text>

            <Text style={styles.property}>CASO:</Text>
            <Text style={styles.value}>{item.title}</Text>

            <Text style={styles.property}>VALOR:</Text>
            <Text style={styles.value}>{
               Intl
                .NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                .format(item.value)}
            </Text>

             <TouchableOpacity style={styles.detailsButtom} onPress={() => navigateToDetails(item)}>
               <Text style={styles.detailsButtomText} >Ver mais detalhes</Text>
               <Feather name="arrow-right" size={16} color="#e02041"/>
             </TouchableOpacity>
        </View>
        )
      }}
     
     />     
    </View>
  )
}