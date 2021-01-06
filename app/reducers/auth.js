import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";
import {
  AUTH_INIT,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  RESET_NOTIFICATION,
  GET_USER_SUCCESS,
  AUTH_SIGN_IN,
} from "@app/actionTypes/auth";
import { GENDER_TYPES } from "@app/constants/auth";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type AuthStateType = {
  status: AsyncStatusType,
  notification: null,
  user: null | Object,
  userDetails: null | Object,
};

const initialState: AuthStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  user: null,
  userDetails: null,
};

function authInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function authSuccess(state, { gender }) {
  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    user: {
      isUserInitiated: true,
      gender,
    },
  };
}

function authFailure(state, { message }) {
  return {
    ...state,
    status: ASYNC_STATUS.FAILURE,
    notification: message,
  };
}

function resetNotification(state) {
  return {
    ...state,
    notification: null,
  };
}

const reducer = (
  state: AuthStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case AUTH_INIT:
      return authInit(state);
    case AUTH_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        userDetails: payload,
      };
    case AUTH_FAILURE:
      return authFailure(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    case AUTH_SIGN_IN:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        user: payload,
      };
    default:
      return state;
  }
};

export default reducer;
