import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';


import { App } from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";

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
const firebaseConfig = {
    apiKey: "AIzaSyDvT6pBRKlWyaDxIjWYFnsgRQwJlGZlI6U",
    authDomain: "info340-campus-connect.firebaseapp.com",
    databaseURL: "https://info340-campus-connect-default-rtdb.firebaseio.com",
    projectId: "info340-campus-connect",
    storageBucket: "info340-campus-connect.appspot.com",
    messagingSenderId: "50803215044",
    appId: "1:50803215044:web:ce067cf2970cdc1780d791"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);