import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";
import {
  VERIFICATION_INIT,
  HANDLE_FAILURE,
  GET_VERIFICATION_LIST_SUCCESS,
  GET_VERIFICATION_SUCCESS,
  RESET_VERIFICATION,
  VERIFICATION_SUCCESS,
  INITIALIZE_VERIFICATION,
  INITIALIZE_VERIFICATIONS,
} from "@app/actionTypes/verification";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type VerificationStateType = {
  status: AsyncStatusType,
  notification: null,
  verifications: Array<any>,
  verification: null | Object,
};

const initialState: VerificationStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  verifications: [],
  verification: {
    verificationId: "",
    username: "",
    deficiency: "",
    findings: "",
    products: [],
    researchCenter: "",
    image: "",
    stage: "",
    nValue: "",
    pValue: "",
    kValue: "",
    checked: false,
  },
};

function verificationInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function verificationSuccess(state) {
  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    notification: null,
  };
}

function verificationFailure(state, { message }) {
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
  state: VerificationStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case VERIFICATION_INIT:
      return verificationInit(state);
    case VERIFICATION_SUCCESS:
      return verificationSuccess(state, payload);
    case RESET_VERIFICATION:
      return resetNotification(state);
    case HANDLE_FAILURE:
      return verificationFailure(state, payload);
    case GET_VERIFICATION_LIST_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        verifications: payload.verifications,
      };
    case GET_VERIFICATION_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        verification: payload.verification,
      };
    case INITIALIZE_VERIFICATION:
      return {
        ...state,
        status: ASYNC_STATUS.INIT,
        notification: null,
        verification: {
          verificationId: "",
          username: "",
          deficiency: "",
          findings: "",
          products: [],
          researchCenter: "",
          image: "",
          stage: "",
          nValue: "",
          pValue: "",
          kValue: "",
          checked: false,
        },
      };
    case INITIALIZE_VERIFICATIONS:
      return {
        ...state,
        status: ASYNC_STATUS.INIT,
        notification: null,
        verifications: [],
        verification: {
          verificationId: "",
          username: "",
          deficiency: "",
          findings: "",
          products: [],
          researchCenter: "",
          image: "",
          stage: "",
          nValue: "",
          pValue: "",
          kValue: "",
          checked: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
