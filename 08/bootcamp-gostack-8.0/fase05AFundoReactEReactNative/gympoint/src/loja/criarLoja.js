import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const potenciador =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, potenciador);
};
