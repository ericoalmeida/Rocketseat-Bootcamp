import React from 'react';
import PropTypes from 'prop-types';
import {Browser} from './styles';

export default function Repositorio({navigation}){
  const repositorio = navigation.getParam('repositorio');

  return <Browser source={{uri: repositorio.html_url}} />
}

Repositorio.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('repositorio').name,
})

Repositorio.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
}
