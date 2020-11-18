import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnnOxwXNnDwI5YkBn1hHPf5IPWOF_AsRM",
  authDomain: "luminouss-web.firebaseapp.com",
  databaseURL: "https://luminouss-web.firebaseio.com",
  projectId: "luminouss-web",
  storageBucket: "luminouss-web.appspot.com",
  messagingSenderId: "96756233299",
  appId: "1:96756233299:web:9656acaac90655a71d42a6",
  measurementId: "G-X59RM3F71E"
};


export default firebase.default.initializeApp(firebaseConfig);
