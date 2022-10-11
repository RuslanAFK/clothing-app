import { User } from "firebase/auth";
import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.utils";
import { ActionWithPayload, Action, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));


export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;
export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

export type GoogleSigninStart = Action<USER_ACTION_TYPES.GOOGLE_SIGNIN_START>;
export const googleSigninStart = withMatcher((): GoogleSigninStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START));


export type EmailSigninStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGNIN_START, { email: string, password: string }>;
export const emailSigninStart = withMatcher((email: string, password: string): EmailSigninStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, { email, password }));


export type SigninSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGNIN_SUCCEESS, UserData>;
export const signinSuccess = withMatcher((user: UserData & { id: string }): SigninSuccess => createAction(USER_ACTION_TYPES.SIGNIN_SUCCEESS, user));

export type SigninFail = ActionWithPayload<USER_ACTION_TYPES.SIGNIN_FAIL, Error>;
export const signinFail = withMatcher((error: Error): SigninFail => createAction(USER_ACTION_TYPES.SIGNIN_FAIL, error));


export type SignupStart = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_START, { email: string, password: string, displayName: string }>;
export const signupStart = withMatcher((email: string, password: string, displayName: string): SignupStart =>
    createAction(USER_ACTION_TYPES.SIGNUP_START, { email, password, displayName }));

export type SignupSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_SUCCEESS, { user: User, additionalDetails: AdditionalInfo }>;
export const signupSuccess = withMatcher((user: User, additionalDetails: AdditionalInfo): SignupSuccess =>
    createAction(USER_ACTION_TYPES.SIGNUP_SUCCEESS, { user, additionalDetails }));

export type SignupFail = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_FAIL, Error>;
export const signupFail = withMatcher((error: Error): SignupFail => createAction(USER_ACTION_TYPES.SIGNUP_FAIL, error));


export type SignoutStart = Action<USER_ACTION_TYPES.SIGNOUT_START>;
export const signoutStart = withMatcher((): SignoutStart => createAction(USER_ACTION_TYPES.SIGNOUT_START));

export type SignoutSuccess = Action<USER_ACTION_TYPES.SIGNOUT_SUCCESS>;
export const signoutSuccess = withMatcher((): SignoutSuccess => createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS));

export type SignoutFail = ActionWithPayload<USER_ACTION_TYPES.SIGNOUT_FAIL, Error>;
export const signoutFail = withMatcher((error: Error): SignoutFail => createAction(USER_ACTION_TYPES.SIGNOUT_FAIL, error));

