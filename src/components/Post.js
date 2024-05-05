import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import { SignInPage } from './SignIn.js';
import {ProfileCard} from "./ProfileCard";

export function Post(props) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [avatar, setAvatar] = useState(null);
    const handleAvatarChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };
    const handleSubmit =  async () => {
        try {
            const storageRef = firebase.storage().ref();
            const avatarRef = storageRef.child(`pictures/${avatar.name}`);
            await avatarRef.put(avatar);
            const url = await avatarRef.getDownloadURL();

            const profileRef = firebase.database().ref(`profiles/${props.currUser.uid}`);
            const profileSnapshot = await profileRef.once('value');
            const userProfile = profileSnapshot.val();
            if (userProfile) {
                const postData = {
                    title: title,
                    content: content,
                    picture: url,
                    uid: props.currUser.uid,
                    uname: userProfile.name,
                    avatar: userProfile.avatar
                }
                await firebase.database().ref('posts').push(postData);
                setSubmitSuccess(true); // Set submission success status to true
            } else {
                console.error('cannot find user');
                return (
                    <ProfileCard/>
                )
            }
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
            <div className="pet_label">Title</div>
            <div ><input type="text" className="pet_input" value={title} onChange={(e) => setTitle(e.target.value)} id="postTitle"/> </div>
            <div className="pet_label">Content</div>
            <div ><textarea  className="pet_input" style={{height:"80px",width:"38.5%"}} value={content} onChange={(e) => setContent(e.target.value)} /></div>
            <div className="pet_label">Picture</div>
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
                     className="postSubmit"
            >Submit</button>
            {submitSuccess && <div className="success-popup">Success</div>}
        </main>

    );
}