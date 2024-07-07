import { useReducer, useCallback } from 'react';

type ActionTypes = 'SEND' | 'SUCCESS' | 'ERROR';

type ReqStatus = 'pending' | 'completed';

interface State {
  data?: any;
  error?: any;
  status: ReqStatus | null;
}

interface Action {
  type: ActionTypes;
  responseData?: Record<string, unknown>;
  errorMessage?: string | unknown;
}

function httpReducer(state: State, action: Action): State {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }

  return state;
}

function useHttp(requestFunction: Function, startWithPending = false) {
  const initial: State = {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  };
  const [httpState, dispatch] = useReducer(httpReducer, initial);

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error: any) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction],
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
