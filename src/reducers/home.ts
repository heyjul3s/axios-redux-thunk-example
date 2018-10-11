import * as actions from '../constants/actions';

interface IInitialState {
  error: Error | undefined;
  posts: any;
}

interface IActionFullFilled {
  type: 'FETCH_POSTS_FULFILLED';
  payload: any[];
}

interface IActionRejected {
  type: 'FETCH_POSTS_REJECTED';
  payload: Error;
}

type Action = IActionFullFilled | IActionRejected;

const initialState: IInitialState = {
  error: undefined,
  posts: undefined,
};

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.FETCH_POSTS_FULFILLED:
      return {
        ...state,
        error: undefined,
        posts: action.payload,
      };

    case actions.FETCH_POSTS_REJECTED:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
