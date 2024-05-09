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
    const [avatar, setAvatar] = useState(null);

    const [petName, setPetName] = useState('');
    const [birthday, setBirthday] = useState('');

    const [petType, setPetType] = useState('');
    const [weight, setWeight] = useState(5);

    const handleChange = (event) => {
        setWeight(event.target.value);
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

                avatar: url,
                uid: props.currUser.uid,
            }
            await firebase.database().ref('profiles').child(props.currUser.uid).set(profileData);

            const profileData1 = {
                name: petName,
                birthday: birthday,
                weight: weight,
                petType,
            }
            await firebase.database().ref('pets').child(props.currUser.uid).set(profileData1);



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

            <div className="pet_label">Name of Pet </div>
            <div ><input type="text" className="pet_input" value={petName} onChange={(e) => setPetName(e.target.value)} /> </div>
            <div className="pet_label">Birthday</div>
            <div ><input type="text" className="pet_input" value={birthday} onChange={(e) => setBirthday(e.target.value)} /></div>
            <div className="pet_label">Pet Type </div>
            <div ><input type="text" className="pet_input" value={petType} onChange={(e) => setPetType(e.target.value)} /> </div>


            <div className="pet_label" >Weight </div>
            <div className="pet_input">
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={weight}
                    onChange={handleChange}
                />
                {weight}
            </div>

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
                     className="save-button"
            >Save</button>
            {submitSuccess && <div className="success-popup">Success</div>}
        </main>

    );
}