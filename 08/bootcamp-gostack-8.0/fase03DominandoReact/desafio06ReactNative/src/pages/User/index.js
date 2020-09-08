import React, { Component } from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/apiGitHub';
import {
  Container,
  Header,
  ImAvatar,
  TxNome,
  TxBio,
  FlFavoritos,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoritos: [],
      carregando: true,
      atualizando: false,
      page: 1,
    };
  }

  componentDidMount() {
    this.carregar();
  }

  carregar = async (page = 1) => {
    try {
      const { favoritos } = this.state;
      const { navigation } = this.props;
      const usuario = navigation.getParam('usuario');
  
      const response = await api.get(`/users/${usuario.login}/starred?page=${page}`);
  
      this.setState({ 
        favoritos: page >= 2 ? [...favoritos, ...response.data] : response.data,
        page, 
        carregando: false,
        atualizando: false, 
      }); 
      
    } catch (error) {
      alert(error);      
    }
   
  }

  carregarMais = () => {
    const { page } = this.state;
    let proximaPagina = page + 1;

    this.carregar(proximaPagina);
  }

  atualizaLista = () => {
    this.setState({atualizando: true,  favoritos: []}, this.carregar);
  }

  acessarTelaRepositorio = repositorio => {
    const {navigation} = this.props;

    navigation.navigate('Repositorio', {repositorio});
  }

  render() {
    const { navigation } = this.props;
    const { favoritos, carregando, atualizando } = this.state;

    const usuario = navigation.getParam('usuario');

    return (
      <Container>
        <Header>
          <ImAvatar source={{ uri: usuario.avatar }} />
          <TxNome>{usuario.name}</TxNome>
          <TxBio>{usuario.bio}</TxBio>
        </Header>
        {
          carregando ? 
          (<ActivityIndicator color="#7159c1" size={50}/>) :
          (
            <FlFavoritos
            data={favoritos}
            onRefresh={this.atualizaLista}
            refreshing={atualizando}
            onEndReachedThreshold={0.2}
            onEndReached={this.carregarMais}
            keyExtractor={favorito => String(favorito.id)}
            renderItem={({ item }) => (
               <Starred onPress={() => this.acessarTelaRepositorio(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />  
          )
        }
      </Container>
    );
  }
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('usuario').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
