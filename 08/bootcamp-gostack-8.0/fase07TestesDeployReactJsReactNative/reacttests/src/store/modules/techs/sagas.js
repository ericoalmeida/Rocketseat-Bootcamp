import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import {carregarTechs, falhaCarregarTechs} from './acoes'

export function* getTechs(){
  try {
    const response = yield call(api.get, 'techs');

    yield put(carregarTechs(response.data));    
  } catch (error) {
    yield put(falhaCarregarTechs());  
  }
}
