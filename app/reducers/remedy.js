import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";
import {
  REMEDY_INIT,
  REMEDY_GET_SUCCESS,
  RESET_NOTIFICATION,
  HANDLE_FAILURE,
  GET_RESEARCH_SUCCESS,
  RESET_RESEARCH,
} from "@app/actionTypes/remedy";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type RemedyStateType = {
  status: AsyncStatusType,
  notification: null,
  remedy: null | Object,
  research: null | Object,
};

const initialState: RemedyStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  remedy: null,
  research: null,
};

function remedyInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function remedySuccess(state, payload) {
  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    remedy: payload,
  };
}

function remedyFailure(state, { message }) {
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
  state: RemedyStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case REMEDY_INIT:
      return remedyInit(state);
    case REMEDY_GET_SUCCESS:
      return remedySuccess(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    case HANDLE_FAILURE:
      return remedyFailure(state, payload);
    case GET_RESEARCH_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        research: payload.researches,
      };
    case RESET_RESEARCH:
      return {
        ...state,
        research: null,
      };
    default:
      return state;
  }
};

export default reducer;
