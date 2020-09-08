import React from 'react';
import TechList from '~/componentes/TechList';

import {render, fireEvent} from '@testing-library/react-native';

describe('TechList Component', () => {
  it('should be able add tech Node.js', () => {
    const {getByText, getByTestId} = render(<TechList />);

    fireEvent.changeText(getByTestId('tech-input'), 'Node.js');
    fireEvent.press(getByText('Adicionar'));

    expect(getByText('Node.js')).toBeTruthy();
    expect(getByTestId('tech-input')).toHaveProp('value', '');
  });
});

/**
 * Configuracao do jest para react-native
 *  - execute: yarn add @testing-library/react-native -D
 *  - execute: yarn add @testing-library/jest-native -D
 *  - execute: yarn add @types/jest -D
 *
 *
 * - Configure o package.json igual ao package.json desse projeto.
 */
