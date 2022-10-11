import { User } from 'firebase/auth';
import { all, call, put, takeLatest } from 'typed-redux-saga/macro'
import {
    AdditionalInfo,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth, getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser
} from '../../utils/firebase/firebase.utils'
import {
    EmailSigninStart,
    signinFail,
    signinSuccess,
    signoutFail,
    signoutSuccess,
    signupFail,
    SignupStart,
    SignupSuccess,
    signupSuccess
} from './user.actions';
import { USER_ACTION_TYPES } from './user.types'

export function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInfo);
        if (userSnapshot) {
            yield* put(signinSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            }))
        }

    } catch (error) {
        yield* put(signinFail(error as Error));
    }
}

export function* isUserAuthed() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signinFail(error as Error));
    }
}

export function* signinWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signinFail(error as Error));
    }
}

export function* signinWithEmail({ payload: { email, password } }: EmailSigninStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            yield* call(getSnapshotFromUserAuth, userCredential.user);
        }
    } catch (error) {
        yield* put(signinFail(error as Error));
    }
}

export function* signupUser({ payload: { email, password, displayName } }: SignupStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            yield* put(signupSuccess(userCredential.user, { displayName }));
        }
    } catch (error) {
        yield* put(signupFail(error as Error));
    }
}

export function* signinAfterSignup({ payload: { user, additionalDetails } }: SignupSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signoutUser() {
    try {
        yield* call(signOutUser);
        yield* put(signoutSuccess());
    } catch (error) {
        yield* put(signoutFail(error as Error));
    }
}


export function* onGoogleSigninStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signinWithGoogle)
}

export function* onEmailSigninStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signinWithEmail)
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthed)
}

export function* onSignupStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGNUP_START, signupUser)
}

export function* onSignupSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCEESS, signinAfterSignup)
}

export function* onSignoutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGNOUT_START, signoutUser)
}


export function* userSaga() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSigninStart),
        call(onEmailSigninStart),
        call(onSignupStart),
        call(onSignupSuccess),
        call(onSignoutStart),
    ])
} 