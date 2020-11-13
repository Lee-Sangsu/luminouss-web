import * as firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8lMHhNpnne4RIWsB-r58xez39XyzIFBk",
  authDomain: "fir-connect-b34ba.firebaseapp.com",
  databaseURL: "https://fir-connect-b34ba.firebaseio.com",
  projectId: "fir-connect-b34ba",
  storageBucket: "fir-connect-b34ba.appspot.com",
  messagingSenderId: "875098743944",
  appId: "1:875098743944:web:83c3788769f20b6b7ceb3d"
};


export default firebase.default.initializeApp(firebaseConfig);
