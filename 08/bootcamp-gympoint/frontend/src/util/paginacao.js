export function paginaAnterior(paginaAtual) {
  const pagina = paginaAtual <= 1 ? 1 : paginaAtual - 1;

  return pagina;
}

export function proximaPagina(paginaAtual) {
  const pagina = paginaAtual + 1;

  return pagina;
}
