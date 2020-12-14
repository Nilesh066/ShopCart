import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBRhw8_gHBauDGTGoQAco-vl-PKf2wIwFU",
  authDomain: "login-fdb00.firebaseapp.com",
  projectId: "login-fdb00",
  storageBucket: "login-fdb00.appspot.com",
  messagingSenderId: "784850282616",
  appId: "1:784850282616:web:7c26ed39444dcf636a258d"
};

const fire=firebase.initializeApp(firebaseConfig);
export default fire;