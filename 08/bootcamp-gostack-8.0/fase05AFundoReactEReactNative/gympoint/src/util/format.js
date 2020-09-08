import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatarSomenteData(data) {
  return format(parseISO(data), "dd'/'MM'/'yyyy", {
    locale: pt,
  });
}

export function formatarSomenteDataExtenso(data) {
  return format(parseISO(data), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  });
}
