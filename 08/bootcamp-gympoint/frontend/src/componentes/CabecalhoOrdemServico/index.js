import React from 'react';

import { CtCabecalho } from '~/componentes/Containers';

import { Container, CtAcoes, CtTitulo } from './styles';

export default function CabecalhoOrdemServico() {
  return (
    <Container>
      <CtCabecalho>
        <CtTitulo>
          <span>Gerenciando Pedidos de Auxílio</span>
        </CtTitulo>
      </CtCabecalho>
      <CtAcoes>
        <button type="button">Tipos de Pedido de Auxílio</button>
        <button type="button">Pedidos de Auxilio</button>
      </CtAcoes>
    </Container>
  );
}
