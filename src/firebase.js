import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCw8Ht9pD6mRERLVVlmWOAZt5FxIgeiJ5E",
    authDomain: "slack-378f0.firebaseapp.com",
    databaseURL: "https://slack-378f0.firebaseio.com",
    projectId: "slack-378f0",
    storageBucket: "slack-378f0.appspot.com",
    messagingSenderId: "177662771915",
    appId: "1:177662771915:web:8c265fdc2079862660514e",
    measurementId: "G-82LX8BLQSJ"
};

const firebaseApp = firebase.initializeApp((firebaseConfig));

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth, provider};
export default db;