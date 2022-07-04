import {
  loginPending,
  loginSuccess,
  loginError,
  registerPending,
  registerSuccess,
  registerError,
  getUserPending,
  getUserSuccess,
  getUserError
} from './actions';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await response.user.getIdToken();
      const {
        claims: { role }
      } = await response.user.getIdTokenResult();
      return await dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(getUserPending());
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
        headers: { token }
      });
      const data = await response.json();
      dispatch(getUserSuccess(data.data));
    } catch (error) {
      dispatch(getUserError(error));
    }
  };
};

export const registerEmployee = (obj) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      };
      dispatch(registerPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(registerSuccess(data));
      } else dispatch(registerError(data.message));
    } catch (error) {
      dispatch(registerError(error));
    }
  };
};
