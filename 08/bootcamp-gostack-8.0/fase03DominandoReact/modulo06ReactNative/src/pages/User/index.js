import React, { Component } from 'react';
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
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const usuario = navigation.getParam('usuario');

    const response = await api.get(`/users/${usuario.login}/starred`);

    this.setState({ favoritos: response.data });
  }

  render() {
    const { navigation } = this.props;
    const { favoritos } = this.state;
    const usuario = navigation.getParam('usuario');

    return (
      <Container>
        <Header>
          <ImAvatar source={{ uri: usuario.avatar }} />
          <TxNome>{usuario.name}</TxNome>
          <TxBio>{usuario.bio}</TxBio>
        </Header>
        <FlFavoritos
          data={favoritos}
          keyExtrator={favorito => String(favorito.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
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
