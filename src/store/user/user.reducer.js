import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SIGNIN_SUCCEESS:
            return { ...state, currentUser: payload, isLoading: false }
        case USER_ACTION_TYPES.SIGNOUT_SUCCESS:
            return { ...state, currentUser: null, isLoading: false }
        case USER_ACTION_TYPES.SIGNUP_SUCCEESS:
            return { ...state, isLoading: false }

        case USER_ACTION_TYPES.SIGNOUT_START:
        case USER_ACTION_TYPES.SIGNUP_START:
        case USER_ACTION_TYPES.EMAIL_SIGNIN_START:
        case USER_ACTION_TYPES.GOOGLE_SIGNIN_START:
            return { ...state, isLoading: true }

        case USER_ACTION_TYPES.SIGNOUT_FAIL:
        case USER_ACTION_TYPES.SIGNUP_FAIL:
        case USER_ACTION_TYPES.SIGNIN_FAIL:
            return { ...state, error: payload, isLoading: false }
        default:
            return state;
    }

}


