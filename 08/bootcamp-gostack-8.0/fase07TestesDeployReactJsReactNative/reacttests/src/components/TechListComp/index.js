import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { Container } from './styles';

import { addTech } from '../../store/modules/techs/acoes';

export default function TechListComp() {
  const executar = useDispatch();

  const [newTech, setNewTech] = useState('');

  const techs = useSelector(state => state.techs.list);

  function addtechs(){
    executar(addTech('Node.js'));
    
    setNewTech('');
  }

  return (
    <Container >
      <form data-testid="tech-form"  onSubmit={addtechs}>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech} >{tech}</li>)}
      </ul>

      <label htmlFor="tech">Tech</label>
      <input type="text" id="tech" value={newTech} onChange={e => setNewTech(e.target.value)} />

      <button type="submit">Adicionar</button>
      </form>
    </Container>
  );
}
