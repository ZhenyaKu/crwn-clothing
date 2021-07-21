import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBn8jkrxnE_Ki8AZZq1Xw3iO3Nj4vMI_-4",
    authDomain: "crwn-clotheshop.firebaseapp.com",
    projectId: "crwn-clotheshop",
    storageBucket: "crwn-clotheshop.appspot.com",
    messagingSenderId: "891457050531",
    appId: "1:891457050531:web:0b511a2414ffe61b9e2c16",
    measurementId: "G-RR32B9HW06"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;