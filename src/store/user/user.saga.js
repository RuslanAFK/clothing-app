import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from '../../utils/firebase/firebase.utils'
import { signinFail, signinSuccess, signoutFail, signoutSuccess, signupFail, signupSuccess } from './user.actions';
import { USER_ACTION_TYPES } from './user.types'

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
        yield put(signinSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }))
    } catch (error) {
        yield put(signinFail(error));
    }
}

export function* isUserAuthed() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signinFail(error));
    }
}

export function* signinWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signinFail(error));
    }
}

export function* signinWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signinFail(error));
    }
}

export function* signupUser({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signupSuccess(user, { displayName }));
    } catch (error) {
        yield put(signupFail(error));
    }
}

export function* signinAfterSignup({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signoutUser() {
    try{
        yield call(signOutUser);
        yield put(signoutSuccess());
    }catch(error){
        yield put(signoutFail(error));
    }
}


export function* onGoogleSigninStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signinWithGoogle)
}

export function* onEmailSigninStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signinWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthed)
}

export function* onSignupStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signupUser)
}

export function* onSignupSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCEESS, signinAfterSignup)
}

export function* onSignoutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGNOUT_START, signoutUser)
}


export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSigninStart),
        call(onEmailSigninStart),
        call(onSignupStart),
        call(onSignupSuccess),
        call(onSignoutStart),
    ])
} 