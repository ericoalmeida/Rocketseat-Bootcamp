import React, { Component } from 'react';
import TechItem from '../components/TecItem';

class ListaTecnologias extends Component{
  state = {
    novaTecnologia: '',
    tecnologias: []
  };

  componentDidMount(){
    //Executado assim que o componente e carregado...
    const techs = localStorage.getItem('tecnologias');

    if(techs){
      this.setState({tecnologias: JSON.parse(techs)});
    }
  }

  componentDidUpdate(_, prevState){
    //executado sempre que houver alteraçoes no estado...
    if(prevState.tecnologias !== this.state.tecnologias){
      localStorage.setItem('tecnologias', JSON.stringify(this.state.tecnologias));
    }

  }

  componentWillUnmount(){
    //Executado quando o componente deixa de existir...
  }


  onInputChange = e => {
    this.setState({novaTecnologia: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      tecnologias: [...this.state.tecnologias, this.state.novaTecnologia],
      novaTecnologia: ''
    });    
  }

  onDeleteTech=(tech) => {
    this.setState({
      tecnologias: this.state.tecnologias.filter(t => t !== tech),
    })
  }

  render(){
    return (
      <form onSubmit={this.onSubmit}>
      <h1>{this.state.novaTecnologia}</h1>
      <ul>
        {this.state.tecnologias.map(tech => (
          <TechItem 
            key={tech} 
            tech={tech} 
            onDelete={() => this.onDeleteTech(tech)}/>
        ))}
      </ul>
        <input 
         type="text" 
         onChange={this.onInputChange} 
         value={this.state.novaTecnologia} 
         />

         <button type="submit">Salvar Tecnologia</button>
      </form>
    )
  }
}

export default ListaTecnologias;