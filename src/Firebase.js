import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3h_W2lv2xyyH0hxoH6mZlp1wqtD50px0",
  authDomain: "todo-auth-ca8b0.firebaseapp.com",
  projectId: "todo-auth-ca8b0",
  storageBucket: "todo-auth-ca8b0.appspot.com",
  messagingSenderId: "955833867830",
  appId: "1:955833867830:web:a37692e9fdbf01563b8297",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export default {firebase};

export const auth = firebase.auth();
export const googleAuthprovider = new firebase.auth.GoogleAuthProvider();
// export default { auth, googleAuthprovider };
