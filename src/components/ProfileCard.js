import React, { useState } from 'react';
//import '../index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import { SignInPage } from './SignIn.js';

export function ProfileCard(props) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [university, setUniversity] = useState('');
    const [languages, setLanguages] = useState('');
    const [interests, setInterests] = useState([]);
    const [aboutMe, setAboutMe] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleInterestsChange = (interest) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter((item) => item !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    const handleAvatarChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };
    const handleSubmit =  async () => {
        try {
            const storageRef = firebase.storage().ref();
            const avatarRef = storageRef.child(`avatars/${avatar.name}`);
            await avatarRef.put(avatar);
            const url = await avatarRef.getDownloadURL();
            const profileData = {
                name: name,
                country: country,
                university: university,
                languages: languages,
                interests: interests,
                aboutMe: aboutMe,
                avatar: url,
                uid: props.currUser.uid,
            }
            await firebase.database().ref('profiles').child(props.currUser.uid).set(profileData);
            setSubmitSuccess(true); // Set submission success status to true
        } catch (error) {
            console.error(error);
        }
    };

    if (props.currUser === null || undefined) {
        return (
            <SignInPage />
        )
    }

    return (
        <main>
            <div className="pet_label">Name</div>
            <div ><input type="text" className="pet_input" value={name} onChange={(e) => setName(e.target.value)} /> </div>
            <div className="pet_label">Home Country</div>
            <div ><input type="text" className="pet_input" value={country} onChange={(e) => setCountry(e.target.value)} /></div>
            <div className="pet_label">School</div>
            <div><input type="text" className="pet_input" value={university} onChange={(e) => setUniversity(e.target.value)} /></div>
            <div className="pet_label">Languages</div>
            <div><input type="text" className="pet_input" value={languages} onChange={(e) => setLanguages(e.target.value)} /></div>
            <div className="pet_label">Avatar</div>
            <div><input type="file" className="pet_input" onChange={handleAvatarChange} /></div>
            <button  style={{

                color: 'white',
                textAlign: 'center',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '15px',
                width:"10%",height:"50px",
                margin: '1% 43%'
            }}
                     type="submit"
                     onClick={handleSubmit}
            >Save</button>
            {submitSuccess && <div className="success-popup">Success</div>}
        </main>

    );
}