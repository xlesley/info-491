import React, {Link, useEffect} from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { ProfileCard } from './ProfileCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MyProfile } from "./MyProfile";
import { useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { SignInPage, SignInRedirectBtns } from "./SignIn";
import {Onboard} from "./Onboard";
import {Main} from "./Main";
import {Pet} from "./Pet";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {Chat} from "./Chat";


export function App(props) {
    const [currUser, setCurrUser] = useState("");

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, function(firebaseUser) {
            setCurrUser(firebaseUser);
        })
    })
    return (
        <Router>
            {/* <div className="container">*/}

                <NavBar />

                <Routes>
                    {/*
                    <Route path="" element={<Feed currUser={currUser}/>} />
                    */}
                    <Route path="" element={<Onboard/>} />

                    
                    {/* <Route  path="/feed" element=INSERT ELEMENT NAME FOR FEED PAGE HERE */}
                    <Route path="/create-profile" element={<ProfileCard currUser={currUser}/>} />
                    <Route path="/my-profile" element={<MyProfile currUser={currUser}/>} />
                    <Route path="/sign-in" element={<SignInPage currUser={currUser}/>} />
                    <Route path="/main" element={<Main currUser={currUser} />} />
                    <Route path="/pet" element={<Pet currUser={currUser}/>} />
                    <Route path="/post" element={<Post currUser={currUser}/>} />
                    <Route path="/comment/:id" element={<Comment currUser={currUser}/>} />
                    <Route path="/chat" element={<Chat currUser={currUser}/>} />
                </Routes>

                <Footer />

            {/* </div>*/}

        </Router>
    )
}