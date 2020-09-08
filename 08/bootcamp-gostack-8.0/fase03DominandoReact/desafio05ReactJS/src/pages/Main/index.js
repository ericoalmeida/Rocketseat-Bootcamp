import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../Componentes/Container';

import { Formulario, SaveButton, RepoEdit, List } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      novoRepositorio: '',
      repositorios: [],
      loading: false,
    };
  }

  componentDidMount() {
    const repositorios = localStorage.getItem('repositorios');

    if (repositorios) {
      this.setState({ repositorios: JSON.parse(repositorios) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositorios } = this.state;

    if (prevState.repositorios !== repositorios) {
      localStorage.setItem('repositorios', JSON.stringify(repositorios));
    }
  }

  handleInputChange = e => {
    this.setState({ novoRepositorio: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { novoRepositorio, repositorios } = this.state;

    try {
      const repoExist = repositorios.filter(repo => repo.name === novoRepositorio);

      if(repoExist){
        throw new Error(`Repositório ${novoRepositorio} já existe`);
      }

      const response = await api.get(`/repos/${novoRepositorio}`);

      const data = {
        name: response.data.full_name,
      };
  
      this.setState({
        repositorios: [...repositorios, data],
        novoRepositorio: '',
        loading: false,
      });
      
    } catch (err) {
      alert(err); 
      
      this.setState({
        loading: false,
      })
    }

  };

  render() {
    const { novoRepositorio, loading, repositorios } = this.state;

    return (
      <Container>
        <h1>
          <FaGitAlt />
          Repositórios
        </h1>

        <Formulario onSubmit={this.handleSubmit}>
          <RepoEdit
            placeholder="Adicionar repositório"
            value={novoRepositorio}
            onChange={this.handleInputChange}
          />
          <SaveButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SaveButton>
        </Formulario>

        <List>
          {repositorios.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
