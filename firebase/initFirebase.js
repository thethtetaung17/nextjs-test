import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
}

export default function initFirebase() {
    // console.log(clientCredentials);
    // console.log(firebase.app.length)
    // if (!firebase.app.length) {
        firebase.initializeApp(clientCredentials);
        if (typeof window !== 'undefined') {
            if ('measurementId' in clientCredentials) {
                firebase.analytics();
                firebase.performance();
            }
        }
        console.log('Firebase have been initialized!')
    // } else {
    //     console.log('Firebase initialization failed!')
    // }
}
