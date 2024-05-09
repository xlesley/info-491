import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { onValue, getDatabase, ref as firebaseRef, set as firebaseSet, push as firebasePush, update as firebaseUpdate } from 'firebase/database';
import 'firebase/compat/database';
import { SignInPage } from './SignIn.js';
import { signOut, getAuth } from 'firebase/auth';
export function MyProfile(props) {
  const [currProfile, setCurrProfile] = useState(null);
  const [currPet, setCurrPet] = useState(null);
    // fetch data
    useEffect(() => {
      const fetchData = async () => {
          const db = getDatabase();
          const allFriendsRef = firebaseRef(db, "profiles");
      onValue(allFriendsRef, function(snapshot) {
          const friendObj = snapshot.val();

          if (props.currUser === null || undefined) {
            setCurrProfile(null);
          } else {
            setCurrProfile(friendObj[props.currUser.uid]);
          }
      })
      };
      fetchData();
       getPet();
    }, []);

    const getPet = async () => {
        try {
            const currUserUid = props.currUser.uid; // Sample user
            console.log("pet:"+currUserUid);
            const currUserPetRef = firebase.database().ref("pets").child(currUserUid);
            const snapshot = await currUserPetRef.once('value');
            const petData = snapshot.val();

            if (petData) {
                setCurrPet(petData);
                console.log("currUserPetRef:", petData);
            } else {
                console.log("No pet data available");
                setCurrPet(null);
            }

        } catch (error) {
            console.error(error);
        }
    };

  const handleSignOut = (event) => {
    console.log("signing out");
    signOut(getAuth());
    console.log(getAuth());
  }

  if (props.currUser === null || undefined) {
    return (
      <SignInPage/>
    )
  } else {
    return(


      <div className="profile-card-main-wrap">
        {currProfile && (
            <>
        <h1 className="profile-card-intro-top">Hi, I'm {currProfile.name}</h1>
        <hr/>

        <div className="profile-card-wrap">

          <div className="profile-card-left">
            <div className="profile-photo-wrap">
              <img src={currProfile.avatar} alt={currProfile.name} className="profile-page-photo" />
            </div>
          </div>

          <div className="profile-card-right">
              <div className="profile-list-top">
                <div className="list-items">
                  <div className="profile-card-icon-wrap">
                    <img src="./img/location.svg" alt="location icon" className="profile-card-icon"/>
                  </div>
                  <p className='size-two'>
                    {currProfile.country}
                  </p>
                </div>

                <div className="list-items">
                  <div className="profile-card-icon-wrap">
                    <img src="./img/hat.svg" alt="graduation hat icon" className="profile-card-icon"/>
                  </div>
                  <p className='size-two'>
                    {currProfile.university}
                  </p>
                </div>

                <div className="list-items">
                  <div className="profile-card-icon-wrap">
                    <img src="./img/internet.svg" alt="world language icon" className="profile-card-icon"/>
                  </div>
                  <p className='size-two'>
                    {currProfile.languages}
                  </p>
                </div>
              </div>

          </div>

          </div>

            </>
            )}



          {currPet && (
              <>
                  <h1 className="profile-card-intro-top">Pet Info</h1>
                  <hr/>

                  <div className="profile-card-wrap">


                      <div className="profile-card-right">
                          <div className="profile-list-top">
                              <div className="list-items">
                                  <div className="profile-card-icon-wrap1">
                                      Name of Pet
                                  </div>
                                  <p className='size-two'>
                                      {currPet.name}
                                  </p>
                              </div>

                              <div className="list-items">
                                  <div className="profile-card-icon-wrap1">
                                      Birthday
                                  </div>
                                  <p className='size-two'>
                                      {currPet.birthday}
                                  </p>
                              </div>

                              <div className="list-items">
                                  <div className="profile-card-icon-wrap1">
                                      Breed
                                  </div>
                                  <p className='size-two'>
                                      {currPet.breed}
                                  </p>
                              </div>
                              <div className="list-items">
                                  <div className="profile-card-icon-wrap1">
                                      Pet Type
                                  </div>
                                  <p className='size-two'>
                                      {currPet.petType}
                                  </p>
                              </div>
                          </div>

                      </div>

                  </div>

              </>
          )}
          <button className="bottom-button" style={{backgroundColor:"#333"}} onClick={handleSignOut} id="sign-out">Sign Out</button>
      </div>


  );
  }
}
