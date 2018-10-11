import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import qs from 'qs';
import * as actions from '../constants/actions';
import * as endpoints from '../constants/endpoints';
import { Config } from '../config';

export default class Request {
  static defaultConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    paramsSerializer: (params: object) => qs.stringify(params),
  };

  public static post = (action: string, config: object = {}) => {
    return Request.init('post', action, config);
  }

  public static get = (action: string, config: object = {}) => {
    return Request.init('get', action, config);
  }

  public static put = (action: string, config: object = {}) => {
    return Request.init('put', action, config);
  }

  public static delete = (action: string, config: object = {}) => {
    return Request.init('delete', action, config);
  }

  private static init = (
    method: string,
    action: string,
    config: object = {},
  ) => {
    const requestConfig = Request.setConfig(method, config);
    const canceller = axios.CancelToken.source();

    return ((dispatch: any): CancelTokenSource => {
      dispatch(Request.onPending(action));

      try {
        Request
          .send(requestConfig)(action)
          .then(Request.dispatchResponse(dispatch, action))
          .catch(Request.dispatchError(dispatch, action))
      } catch (error) {
        Request.catchError(error);
      } finally {
        canceller.cancel();
      }

      return canceller;
    });
  }

  private static setConfig = (method: string, config: object) => {
    return {
      ...Request.defaultConfig,
      ...config,
      method,
    };
  }

  private static dispatchResponse = (
    dispatch: any,
    action: string
  ) => (
    response: AxiosResponse
  ) => {
    dispatch(Request.onSuccess(action)(response));
  }

  private static dispatchError = (
    dispatch: any,
    action: string
  ) => (
    error: Error
  ) => {
    dispatch(Request.onError(action)(error));
  }

  private static catchError = (error: Error) => {
    if (axios.isCancel(error)) {
      throw new Error(`Request cancelled: ${error.message}`);
    } else {
      throw new Error(`Error retrieving response: ${error.message}`);
    }
  }

  private static send = (config: object = {}) => (action: string) => {
    return axios({
      url: `${Config.API_URL}/${endpoints[`${action}_ENDPOINT`]}`,
      ...config,
    });
  }

  private static onPending = (action: string) => {
    return {
      type: actions[`${action}_PENDING`],
    };
  }

  private static onSuccess = (action: string) => (response: AxiosResponse) => {
    return {
      type: actions[`${action}_FULFILLED`],
      payload: response.data
    };
  }

  private static onError = (action: string) => (error: Error) => {
    return {
      type: actions[`${action}_REJECTED`],
      payload: error.message
    };
  }
}
