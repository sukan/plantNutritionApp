import {
  REMEDY_INIT,
  REMEDY_GET_SUCCESS,
  RESET_NOTIFICATION,
  HANDLE_FAILURE,
  GET_RESEARCH_SUCCESS,
  RESET_RESEARCH,
} from "@app/actionTypes/remedy";
import { navigate } from "@app/actions/routes";

export function getRemedyDetails(image, baseString, soilData) {
  return (dispatch, getState, serviceManager) => {
    // dispatch({
    //   type: REMEDY_GET_SUCCESS,
    //   payload: {
    //     image,
    //     remedyClass: "Guava nitrogen deficiency",
    //     result_percentage: "79",
    //     nValue: "4",
    //     pValue: "5",
    //     kValue: "6",
    //   },
    // });
    // dispatch(navigate("Remedy Results"));
    dispatch({ type: REMEDY_INIT });

    const remedyService = serviceManager.get("RemedyService");

    remedyService
      .getRemedyType({ img: baseString })
      .then((response) => {
        let remedyClass = response.data.class;

        remedyService
          .getRemedyDetails({ img: baseString })
          .then((response) => {
            let result = response.data.result;
            let result_percentage = response.data.result_percentage;

            dispatch({
              type: REMEDY_GET_SUCCESS,
              payload: {
                nValue: "4",
                pValue: "5",
                kValue: "6",
                image,
                remedyClass,
                result,
                result_percentage,
              },
            });
            dispatch(navigate("Remedy Results"));

            // remedyService
            //   .getSoilDetails({ ...soilData })
            //   .then((response) => {
            //     let soil = response.data.result;

            //     dispatch({
            //       type: REMEDY_GET_SUCCESS,
            //       payload: { ...soil, image, class, result, result_percentage },
            //     });
            //     dispatch(navigate("Remedy Results"));
            //   })
            //   .catch(() => {
            //     dispatch({
            //       type: HANDLE_FAILURE,
            //       payload: { message: "Request Failed" },
            //     });
            //   });
          })
          .catch(() => {
            dispatch({
              type: HANDLE_FAILURE,
              payload: { message: "Request Failed" },
            });
          });
      })
      .catch(() => {
        dispatch({
          type: HANDLE_FAILURE,
          payload: { message: "Request Failed" },
        });
      });
  };
}

export function getResearchDetails(query) {
  return (dispatch, getState, serviceManager) => {
    dispatch({ type: REMEDY_INIT });

    const remedyService = serviceManager.get("RemedyService");

    remedyService
      .getResearchDetails(query)
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: GET_RESEARCH_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: HANDLE_FAILURE,
            payload: { message: "No Research data found" },
          });
        }
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
    dispatch({ type: RESET_RESEARCH });
  };
}
