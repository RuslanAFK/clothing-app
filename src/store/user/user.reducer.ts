import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { emailSigninStart, googleSigninStart, signinFail, signinSuccess, signoutFail, signoutStart, signoutSuccess, signupFail, signupStart, signupSuccess } from "./user.actions";

export type UserState = {
    readonly currentUser: UserData | null,
    readonly isLoading: boolean,
    readonly error: Error | null,
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {

    if (signinSuccess.match(action)) {
        return { ...state, currentUser: action.payload, isLoading: false }
    }
    if (signupSuccess.match(action)) {
        return { ...state, isLoading: false }
    }
    if (signoutSuccess.match(action)) {
        return { ...state, currentUser: null, isLoading: false }
    }
    if (signoutStart.match(action) || signupStart.match(action) ||
        emailSigninStart.match(action) || googleSigninStart.match(action)) {
        return { ...state, isLoading: true }
    }
    if (signoutFail.match(action) || signinFail.match(action) || signupFail.match(action)) {
        return { ...state, error: action.payload, isLoading: false }
    }
    return state;
}


