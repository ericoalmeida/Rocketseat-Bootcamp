import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const potenciador = __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  return createStore(reducers, potenciador);
};
