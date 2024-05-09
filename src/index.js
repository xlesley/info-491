import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';


import { App } from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
    apiKey: "AIzaSyBLNyRbt6XDyPB4t_XQb6w_m7Za1dZjAcM",
    authDomain: "info340-78916.firebaseapp.com",
    projectId: "info340-78916",
    storageBucket: "info340-78916.appspot.com",
    messagingSenderId: "41115156677",
    appId: "1:41115156677:web:f4aaf5e80e4a6fe79a70ac",
    measurementId: "G-JCMEWX3LY3"
};

 */
/*
const firebaseConfig = {
    apiKey: "AIzaSyDvT6pBRKlWyaDxIjWYFnsgRQwJlGZlI6U",
    authDomain: "info340-campus-connect.firebaseapp.com",
    databaseURL: "https://info340-campus-connect-default-rtdb.firebaseio.com",
    projectId: "info340-campus-connect",
    storageBucket: "info340-campus-connect.appspot.com",
    messagingSenderId: "50803215044",
    appId: "1:50803215044:web:ce067cf2970cdc1780d791"
};

 */

const firebaseConfig = {
    apiKey: "AIzaSyCOeA0rvsa2-iKKOw1wqfd5XUCbGZTpD1s",
    authDomain: "info490-faa56.firebaseapp.com",
    projectId: "info490-faa56",
    storageBucket: "info490-faa56.appspot.com",
    messagingSenderId: "407184466844",
    appId: "1:407184466844:web:6ce28d78693b7ae67d1e59",
    measurementId: "G-F0DYM840X0"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);