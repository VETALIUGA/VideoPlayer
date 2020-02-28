import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyABY7SzVl_3mrc0eMJA3E3cIk1yaGtYDVo",
    authDomain: "testproj-d5bab.firebaseapp.com",
    databaseURL: "https://testproj-d5bab.firebaseio.com",
    storageBucket: "testproj-d5bab.appspot.com"
};

export default firebase.initializeApp(config);