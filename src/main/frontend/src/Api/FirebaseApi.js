import firebase from "firebase/compat/app";
import "firebase/compat/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDe-XvFzV3YDhG8c_mTeb7tb1bXxQzCcHo",
  authDomain: "miniporject-2d91f.firebaseapp.com",
  projectId: "miniporject-2d91f",
  storageBucket: "miniporject-2d91f.appspot.com",
  messagingSenderId: "118340290693",
  appId: "1:118340290693:web:9549ecac8066fb250781ec",
  measurementId: "G-9KBBSEH3YX"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();