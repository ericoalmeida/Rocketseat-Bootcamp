import produce from 'immer';

export const InitialState = [];

export default function techs(state = InitialState, action){
  return produce(state, draft => {
    switch (action.type) {
      case '@tech/Add': {
        draft.push(action.payload.tech);        
        break
      };
    
      default:
    }
  })
}