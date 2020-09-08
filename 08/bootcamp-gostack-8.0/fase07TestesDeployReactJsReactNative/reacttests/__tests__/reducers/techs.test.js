import reducer, { InitialState } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/acoes';

describe('Techs reducer', () => {
  //Testando Initial state do reducer
  it('InitialState', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(InitialState);
  });


  //Testando reducers da aplicação
  it('@tech/Add', () => {
    const state = reducer(InitialState, Techs.addTech('Node.js'));

    expect(state).toStrictEqual(['Node.js']);  
  });
});
