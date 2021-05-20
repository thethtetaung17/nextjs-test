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
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const initFirebase = () => {
    const apps = firebase.apps.map(a => a.name);
    console.log(apps)
    if (!firebase.app) {
        console.log('Firebase is initializing...')
        firebase.initializeApp(clientCredentials);
        if (typeof window !== 'undefined') {
            if ('measurementId' in clientCredentials) {
                firebase.analytics();
                firebase.performance();
            }
        }
    }
    console.log('Firebase have been initialized!');
}

export default initFirebase;