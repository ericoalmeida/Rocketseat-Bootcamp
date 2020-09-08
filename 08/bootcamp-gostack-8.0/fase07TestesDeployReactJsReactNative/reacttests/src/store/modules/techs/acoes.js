export function addTech(tech){
  return {
    type: '@tech/Add',
    payload: { tech }
  }
}

export function carregarTechs(data){
  return {
    type: '@tech/List',
    payload: { data }
  }
}

export function falhaCarregarTechs(){
  return {
    type: '@tech/Falha'
  }
}