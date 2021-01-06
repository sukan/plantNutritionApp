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
import { navigate, navigateAndReset } from "@app/actions/routes";

export function createVerification(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({ type: VERIFICATION_INIT });

    const verificationService = serviceManager.get("VerificationService");

    verificationService
      .createVerification(payload)
      .then(({ success, data }) => {
        dispatch({ type: VERIFICATION_SUCCESS });
        dispatch(navigateAndReset("Dashboard"));
      })
      .catch(() => {
        dispatch({
          type: HANDLE_FAILURE,
          payload: { message: "Request Failed" },
        });
        dispatch(navigateAndReset("Dashboard"));
      });
  };
}

export function getVerificationsList(query) {
  return (dispatch, getState, serviceManager) => {
    dispatch({ type: VERIFICATION_INIT });

    const verificationService = serviceManager.get("VerificationService");

    verificationService
      .getVerificationsList(query)
      .then(({ success, data }) => {
        dispatch({ type: GET_VERIFICATION_LIST_SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({
          type: HANDLE_FAILURE,
          payload: { message: "Request Failed" },
        });
      });
  };
}

export function getVerification(query) {
  return (dispatch, getState, serviceManager) => {
    dispatch({ type: VERIFICATION_INIT });

    const verificationService = serviceManager.get("VerificationService");

    verificationService
      .getVerification(query)
      .then(({ success, data }) => {
        dispatch({ type: GET_VERIFICATION_SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({
          type: HANDLE_FAILURE,
          payload: { message: "Request Failed" },
        });
      });
  };
}

export function resetResearch() {
  return (dispatch) => {
    dispatch({ type: RESET_VERIFICATION });
  };
}

export function initializeVerification() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_VERIFICATION });
  };
}

export function initializeVerifications() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_VERIFICATIONS });
  };
}
