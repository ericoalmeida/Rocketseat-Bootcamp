import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import TechListComp from '~/components/TechListComp';

import { addTech } from '../../src/store/modules/techs/acoes';


jest.mock('react-redux');

describe('TechList', () => {
  //Testando se i componente recebe o valor do state com o useSelector.
  it('should render tech list', () => {
    useSelector.mockImplementation(cb => cb({
      techs: {
        list: ['Node.js', 'ReactJS']
      } 
    }));

    const { getByTestId, getByText } = render(<TechListComp />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });


  //Testando se o useDispatch será executado
  it('should be able to add new tech', () => {
    const {getByTestId, getByLabelText} = render(<TechListComp />);

    const executar = jest.fn();

    useDispatch.mockReturnValue(executar);

    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}});
    fireEvent.submit(getByTestId('tech-form'));

    expect(executar).toHaveBeenCalledWith(addTech('Node.js'));
  })
});