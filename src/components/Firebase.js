// @flow
import * as firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDL5_Y9aMrobpfOQ5ML4afUo5IneeXmZF0",
  authDomain: "whatscooking-b80e9.firebaseapp.com",
  databaseURL: "https://whatscooking-b80e9.firebaseio.com",
  projectId: "whatscooking-b80e9",
  storageBucket: "whatscooking-b80e9.appspot.com",
  messagingSenderId: "41743103985"
};

export default class Firebase {

    static firestore: firebase.firestore.Firestore;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.firestore = firebase.firestore();
        Firebase.storage = firebase.storage();
    }
}
