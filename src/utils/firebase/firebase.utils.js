import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAecN7zaGOgXs4Ii7nRxBWpPsdCIcyLCUI",
    authDomain: "clothing-app-db-8efa6.firebaseapp.com",
    projectId: "clothing-app-db-8efa6",
    storageBucket: "clothing-app-db-8efa6.appspot.com",
    messagingSenderId: "410218424600",
    appId: "1:410218424600:web:7764b344dd45247d41166d"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(error) {
            console.log(error.message)
        }
    }
    return userDocRef;
}