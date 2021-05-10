import firebase from 'firebase';
require("@firebase/firestore");

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBBonyrmFw33mTQ9axgCYJ-5zesXpsWStI",
    authDomain: "story-hub-5884d.firebaseapp.com",
    projectId: "story-hub-5884d",
    storageBucket: "story-hub-5884d.appspot.com",
    messagingSenderId: "172256416163",
    appId: "1:172256416163:web:b31943c39d7e28ca194a16"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();