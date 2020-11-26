import types from 'store/types';

const initialState = {
  user: {},
  secondPlayer: {},
  wordMaster: 1,
  opponent: 'ai',
  word: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: {
          name: action.payload.data.name,
          id: action.payload.data.id,
        },
      };
    case types.SET_SECOND_USER:
      return {
        ...state,
        secondPlayer: {
          name: action.payload.data.name,
          id: action.payload.data.id,
        },
      };
    case types.SET_WORDMASTER:
      return {
        ...state,
        wordMaster: action.payload,
      };
    case types.SET_WORD:
      return {
        ...state,
        word: action.payload,
      };
    case types.SET_OPPONENT:
      return {
        ...state,
        opponent: action.payload,
      };
    default:
      return state;
  }
}
