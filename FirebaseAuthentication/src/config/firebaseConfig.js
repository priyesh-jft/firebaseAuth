import * as Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDFVnxKxZMMMfFsb6f8eUWdorPvXUPKNew",
    authDomain: "fir-demoapp-9a5b6.firebaseapp.com",
    databaseURL: "https://fir-demoapp-9a5b6.firebaseio.com",
    projectId: "fir-demoapp-9a5b6",
    storageBucket: "fir-demoapp-9a5b6.appspot.com",
    messagingSenderId: "212488847729"
};

export const firebaseRef = Firebase.initializeApp(config);
