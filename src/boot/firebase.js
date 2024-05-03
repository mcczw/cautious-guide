//import firebase from 'firebase'
import firebase from 'firebase/app';
import { auth } from 'firebase/app';
//import 'firebase/auth';

import 'firebase/firestore'

//ADD YOUR CONFIG INFO HERE FROM FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAEY2aIOoVz9TBuJ91UEuksTNzGlFHqyN4",
  authDomain: "csc561-96d5e.firebaseapp.com",
  projectId: "csc561-96d5e",
  storageBucket: "csc561-96d5e.appspot.com",
  messagingSenderId: "194863771335",
  appId: "1:194863771335:web:1698347b256d3fb76318e2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()

const settings = {}

firestore.settings(settings)

export default firestore

