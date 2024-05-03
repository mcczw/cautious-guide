//import firebase from 'firebase'
import firebase from 'firebase/app';
import { auth } from 'firebase/app';
//import 'firebase/auth';

import 'firebase/firestore'

//ADD YOUR CONFIG INFO HERE FROM FIREBASE
const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "AUTHDOMAIN",
  projectId: "PROJID",
  storageBucket: "BUCKET",
  messagingSenderId: "SENDERID",
  appId: "APPID"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()

const settings = {}

firestore.settings(settings)

export default firestore

