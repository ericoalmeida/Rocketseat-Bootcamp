import React from 'react';

import {
  Container,
  Cabecalho,
  ContainerAcoes,
  ContainerConsulta,
  Conteudo,
  ContainerTabela,
  ContainerTabelaCabecalho,
  ContainerTabelaCorpo,
  Rodape,
} from './styles';

export default function CarregandoPagina() {
  return (
    <Container>
      <Cabecalho>
        <ContainerAcoes>
          <div />
        </ContainerAcoes>
        <ContainerConsulta />
      </Cabecalho>
      <Conteudo>
        <ContainerTabela>
          <ContainerTabelaCabecalho />
          <ContainerTabelaCorpo />
        </ContainerTabela>
      </Conteudo>
      <Rodape />
    </Container>
  );
}
