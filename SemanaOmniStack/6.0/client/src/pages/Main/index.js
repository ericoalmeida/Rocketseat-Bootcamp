import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default class Main extends Component {
  state = {
    newBox: '',
  };

  criarBox = async e => {
    e.preventDefault();

    const response = await api.post('/boxes', {
      title: this.state.newBox,
    })

    this.props.history.push(`/box/${response.data._id}`);
  }

  capturaValorInput = (e) => {
    this.setState({ newBox: e.target.value })
  }
  
  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.criarBox} >
          <img src={logo} alt="logo"/>
          <input 
           type="text" 
           placeholder="Criar box" 
           value={this.state.newBox} 
           onChange={this.capturaValorInput}
           />
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}
