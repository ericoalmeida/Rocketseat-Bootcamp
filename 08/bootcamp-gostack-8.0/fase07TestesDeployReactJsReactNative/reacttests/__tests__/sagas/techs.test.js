import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import api from '../../src/services/api';

import { carregarTechs, falhaCarregarTechs } from '../../src/store/modules/techs/acoes';
import { getTechs } from '../../src/store/modules/techs/sagas'

const apiMock = new MockAdapter(api);

//Testando sagas com chamadas a API.
describe('Techs Saga', () => {
  // testando o retorno da api.
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js']);
  
    await runSaga({dispatch}, getTechs).toPromise();
  
    expect(dispatch).toHaveBeenCalledWith(carregarTechs(['Node.js']));
  });


  //testabdo retorno com erro da api
  it('should fail when api retunr error', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(500);
  
    await runSaga({dispatch}, getTechs).toPromise();
  
    expect(dispatch).toHaveBeenCalledWith(falhaCarregarTechs());
  });
});