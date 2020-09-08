import React from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import { Container, Esquerdo, Titulo, Direito, Horario } from './styles';

export default function CheckIn({ data }) {
  return (
    <Container>
      <Esquerdo>
        <Titulo>Check-in #{data.id}</Titulo>
      </Esquerdo>

      <Direito>
        <Horario>
          {formatRelative(parseISO(data.createdAt), new Date(), {
            locale: pt,
          })}
        </Horario>
      </Direito>
    </Container>
  );
}

CheckIn.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
