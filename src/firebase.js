//import firebase from 'firebase';
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyD3OPj-QMUQuvxk6hCdNTioXm8x0qLaUXA",
  authDomain: "example-crudapp.firebaseapp.com",
  projectId: "example-crudapp",
  storageBucket: "example-crudapp.appspot.com",
  messagingSenderId: "293501990760",
  appId: "1:293501990760:web:ecd4810ef7b2dfd89e48dd",
  measurementId: "G-V3Y91ZNQBF"

};
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth() 
  const db=firebase.firestore();
  export default db;