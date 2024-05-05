// Main.js

import React, {useEffect, useState} from "react";

import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import {ProfileCard} from "./ProfileCard";
export function Comment(props){
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [content, setContent] = useState('');
    const location = useLocation();
    const card = location.state.card;
    const handleSubmit =  async () => {
        try {
            const profileRef = firebase.database().ref(`profiles/${props.currUser.uid}`);
            const profileSnapshot = await profileRef.once('value');
            const userProfile = profileSnapshot.val();
            if (userProfile) {
                const postData = {
                    content: content,
                    postid: card.id,
                    uid: props.currUser.uid,
                    uname: userProfile.name,
                    avatar: userProfile.avatar
                }
                await firebase.database().ref('comments').push(postData);
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
    const [cardsData, setCardsData] = useState([]);
    useEffect(() => {
        const postsRef = firebase.database().ref('comments');
        const unsubscribe = postsRef.on('value', (snapshot) => {
            const posts = snapshot.val();
            const postsList = [];
            console.log("cardid:"+card.id);
            for (let id in posts) {
                //postsList.push({ id, ...posts[id] });
                if (posts[id].postid===card.id) {
                    postsList.push({ id, ...posts[id] });
                }
            }
            setCardsData(postsList);
        });

        return () => postsRef.off('value', unsubscribe);
    }, [card.id]);

    return (
        <div style={{ width:"100%",display:"flex" }}>


            <div style={{ width: "100%", padding: "0% 25%",height:"100%",display: "flex", flexDirection: "column",justifyContent: "center",alignItems:"center" }}>

                <div style={{ width:"100%",padding: "10px"}}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>


                        <div  style={{ width: "100%", margin: "10px", border: "0px solid #ccc", padding: "10px",display: "flex", flexDirection: "column" }}>
                            <img src={card.picture} alt="Card" style={{ width: "100%", height: "auto" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={card.avatar}  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                                    <span style={{fontWeight: "bold"}}>{card.title}</span>
                                </div>
                            </div>

                            <div>
                                <span style={{marginLeft:"35px",fontSize: "10px",marginTop:"5px",color:"#333333"}}>{card.uname}</span><img src='../img/main/icon1.svg' style={{ width: "15px", height: "20px", borderRadius: "50%", marginLeft: "10px",paddingTop: "5px" }}/>
                            </div>
                            <span style={{marginLeft:"35px",fontSize: "14px",marginTop:"5px",color:"#333333"}}>{card.content}</span>

                            {cardsData.map((card) => (
                                <div key={card.id} style={{ width: "22%", margin: "10px", border: "0px solid #ccc", padding: "10px",display: "flex", flexDirection: "column" }}>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img src={card.avatar}  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                                            <span style={{fontWeight: "bold"}}>{card.uname}</span>

                                        </div>

                                    </div>
                                    <span style={{marginLeft:"35px",fontSize: "10px",marginTop:"5px",color:"#333333"}}>{card.content}</span>

                                </div>
                            ))}


                            <textarea id="message" name="message" placeholder="comment" style={{width:"95%",margin:"2% 0%"}} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            <button type="submit" style={{width:"20%",alignItems:"center"}}  onClick={handleSubmit} class="commentButton">Comment</button>

                        </div>
                        {submitSuccess && <div className="success-popup">Success</div>}

                    </div>
                </div>
            </div>
        </div>
    );
};

