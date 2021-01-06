import { navigateAndReset } from "@app/actions/routes";
import {
  AUTH_INIT,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  RESET_NOTIFICATION,
  GET_USER_SUCCESS,
  AUTH_SIGN_IN,
} from "@app/actionTypes/auth";
import {
  AUTH_TOKEN_KEY,
  GENDER_KEY,
  USER_NAME_KEY,
  RESEARCH_CENTER_KEY,
} from "@app/constants/auth";

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: AUTH_FAILURE, payload: { message } });
  };
}

function authSuccess() {
  return {
    type: AUTH_SUCCESS,
  };
}

function authSignIn(payload) {
  return {
    type: AUTH_SIGN_IN,
    payload,
  };
}

export function isUserLogged() {
  return (dispatch, getState, serviceManager) => {
    const storageService = serviceManager.get("StorageService");
    storageService
      .getItems([
        AUTH_TOKEN_KEY,
        GENDER_KEY,
        RESEARCH_CENTER_KEY,
        USER_NAME_KEY,
      ])
      .then((stores) => {
        const values = {};
        stores.map((result, i, store) => {
          values[store[i][0]] = store[i][1];
        });
        const token = values[AUTH_TOKEN_KEY];
        const gender = values[GENDER_KEY];
        const researchCenter = values[RESEARCH_CENTER_KEY];
        const username = values[USER_NAME_KEY];
        if (token && token !== null) {
          dispatch(authSignIn({ gender, researchCenter, username }));
          serviceManager.get("ApiService").authToken = token;
          dispatch(navigateAndReset("Dashboard"));
        } else {
          dispatch(navigateAndReset("Sign In"));
        }
      });
  };
}

export function userLogin(payload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    const storageService = serviceManager.get("StorageService");
    dispatch({
      type: AUTH_INIT,
    });
    authService
      .login(payload)
      .then(({ success, message, data }) => {
        if (success) {
          storageService.saveItems([
            [AUTH_TOKEN_KEY, data.token.key],
            [GENDER_KEY, data.gender],
            [RESEARCH_CENTER_KEY, data.researchCenter],
            [USER_NAME_KEY, data.username],
          ]);
          serviceManager.get("ApiService").authToken = data.token.key;
          dispatch(authSignIn(data));
          dispatch(navigateAndReset("Dashboard"));
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed!" },
        });
      });
  };
}

export function userSignUp(payload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    dispatch({
      type: AUTH_INIT,
    });

    console.log(payload);

    authService
      .register({ ...payload })
      .then(({ success, message }) => {
        if (success) {
          dispatch(navigateAndReset("Sign In"));
          dispatch(authSuccess());
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed" },
        });
      });
  };
}

export function userLogout() {
  return (dispatch, getState, serviceManager) => {
    const storageService = serviceManager.get("StorageService");
    storageService.deleteItem(AUTH_TOKEN_KEY).then((token) => {
      dispatch(navigateAndReset("Sign In"));
    });
  };
}

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}
