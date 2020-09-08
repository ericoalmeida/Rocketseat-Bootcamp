import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList'

describe('TechList component', () => {
  //Antes de cada teste, limpa o localStorage.
  beforeEach(() => {
    localStorage.clear();
  });

  //Testando se um item é adicionado em uma lista apos o submit do form
  it('it should be able add new tech', () => {
    const { getByText, getByTestId, getByLabelText} = render(<TechList />); //renderiza o component

    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}});
    fireEvent.submit(getByTestId('tech-form'));
    
    // fireEvent.click(getByText('Adicionar')) //Simula o evento click do botão.
    
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  //Testando se um item adiconado no storage, continua no storage apos atualizar a pagina
  it('should store techs in storage', () => {
    let { getByText, getByTestId, getByLabelText} = render(<TechList />); //renderiza o component

    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}});
    fireEvent.submit(getByTestId('tech-form'));

    cleanup(); //Limpa  o html e o techlist
    
    ({ getByText, getByTestId, getByLabelText} = render(<TechList />)); //renderiza o component

    //Espera que o metodo setItem do localStorage seja chamado
    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));

    //Espera que apos atualizar a pagina, ainda exista um item Node.js na lista de techs.
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));   
  });
});