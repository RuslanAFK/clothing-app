import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from "../../store/categories/categories.types";

const firebaseConfig = {
    apiKey: "AIzaSyAecN7zaGOgXs4Ii7nRxBWpPsdCIcyLCUI",
    authDomain: "clothing-app-db-8efa6.firebaseapp.com",
    projectId: "clothing-app-db-8efa6",
    storageBucket: "clothing-app-db-8efa6.appspot.com",
    messagingSenderId: "410218424600",
    appId: "1:410218424600:web:7764b344dd45247d41166d"
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments =
    async<T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
        const collectionRef = collection(db, collectionKey);
        const batch = writeBatch(db);

        objectsToAdd.forEach(object => {
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object);
        });

        await batch.commit();
    }

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
        docSnapShot => docSnapShot.data() as Category
    );
}


export type AdditionalInfo = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}


export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInfo?: AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (!userAuth) {
        return;
    }
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.log(error)
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}

