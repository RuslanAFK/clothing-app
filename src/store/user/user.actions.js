import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSigninStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START);
export const emailSigninStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, { email, password });
export const signinSuccess = (user) => createAction(USER_ACTION_TYPES.SIGNIN_SUCCEESS, user);
export const signinFail = (error) => createAction(USER_ACTION_TYPES.SIGNIN_FAIL, error);

export const signupStart = (email, password, displayName) =>
    createAction(USER_ACTION_TYPES.SIGNUP_START, { email, password, displayName });
export const signupSuccess = (user, additionalDetails) =>
    createAction(USER_ACTION_TYPES.SIGNUP_SUCCEESS, { user, additionalDetails });
export const signupFail = (error) => createAction(USER_ACTION_TYPES.SIGNUP_FAIL, error);

export const signoutStart = () => createAction(USER_ACTION_TYPES.SIGNOUT_START);
export const signoutSuccess = () => createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS);
export const signoutFail = (error) => createAction(USER_ACTION_TYPES.SIGNOUT_FAIL, error);


