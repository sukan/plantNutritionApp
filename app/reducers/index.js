import { combineReducers } from "redux";

import auth, { type AuthStateType } from "./auth";
import remedy, { type RemedyStateType } from "./remedy";
import verification, { type VerificationStateType } from "./verification";

export type ApplicationState = {
  auth: AuthStateType,
  remedy: RemedyStateType,
  verification: VerificationStateType,
};

export default () => combineReducers({ auth, remedy, verification });
