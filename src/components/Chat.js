import React, {useEffect, useState} from "react";
import '../chat.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {SignInPage} from "./SignIn";


const chatStyles ={
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '15px',

        backgroundImage: 'url(./img/mainhead.png)',
        backgroundSize: 'cover',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    name: {
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: '5px',
    },
    lastMessage: {
        fontSize: '14px',
        color: '#666',
    },
};



export function Chat(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("user has loginin")
            setIsLoggedIn(true);


            async function fetchData() {
                const profileRef = firebase.database().ref(`profiles/${user.uid}`);
                const profileSnapshot = await profileRef.once('value');
                const userProfile = profileSnapshot.val();
                if (userProfile) {

                } else {
                    console.error('cannot find user');
                    return;
                }
                const postsRef = firebase.database().ref('profiles');
                const unsubscribe = postsRef.on('value', (snapshot) => {
                    const posts = snapshot.val();
                    const postsList = [];

                    for (let id in posts) {
                        let messages = [];
                        const chatId = id < props.currUser.uid ? id + '_' + props.currUser.uid : props.currUser.uid + '_' + id;
                        console.log("chatId:"+chatId);
                        const chatRef = firebase.database().ref(`chats/${chatId}`);
                        chatRef.orderByChild('timestamp').once('value', (snapshot) => {

                            snapshot.forEach((childSnapshot) => {
                                messages.push(childSnapshot.val());
                            });

                            console.log(messages);
                        });
                        if (posts[id].name !== userProfile.name) {
                            postsList.push({id, ...posts[id],messages});
                        }

                    }
                    setConversations(postsList);
                });


                return () => postsRef.off('value', unsubscribe);
            }


            fetchData();

        } else {
            console.log("user not loginin")
            setIsLoggedIn(false);
        }
        });


    }, []);

    const [activeConversationId, setActiveConversationId] = useState('1');
    const [input, setInput] = useState('');

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const message = {
                id: Date.now(),
                text: input,
                sender: props.currUser.uid,
                to: activeConversationId,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            const chatId = activeConversationId < props.currUser.uid ? activeConversationId + '_' + props.currUser.uid : props.currUser.uid + '_' + activeConversationId;

            const chatRefPath = `chats/${chatId}`;
            const chatRef = firebase.database().ref(chatRefPath);


            chatRef.push(message).then(() => {
                console.log('Message sent and saved to Firebase');
            }).catch((error) => {
                console.error('Error saving message to Firebase:', error);
            });

            const updatedConversations = conversations.map(conversation => {
                if (conversation.id === activeConversationId) {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, { id: Date.now(), text: input, sender: props.currUser.uid,to: activeConversationId }]
                    };
                }
                return conversation;
            });
            setConversations(updatedConversations);
            setInput('');
        }
    };

    const switchConversation = (id) => {
        setActiveConversationId(id);
 
    };


    return(

            <main>
            {isLoggedIn &&
            <div style={{display: "flex", width: "100%"}}>
            <div style={{
                width: "100%",
                padding: "20px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <div className="chat-layout">
                    <div className="conversation-list">

                        {conversations.map(conversation => (
                            <div
                                key={conversation.id}
                                className={`conversation-item ${conversation.id === activeConversationId ? 'active-conversation' : ''}`}
                                onClick={() => switchConversation(conversation.id)}
                            >
                                {/*{conversation.name}*/}
                                <div style={chatStyles.container}>
                                    <div style={chatStyles.avatar}><img src={conversation.avatar} style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        marginRight: "10px"
                                    }}/></div>
                                    <div style={chatStyles.userInfo}>
                                        <div style={chatStyles.name}>{conversation.name}</div>
                                        {/*
                                        <div style={chatStyles.lastMessage}>{conversation.messages[0]}</div>
                                       */}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="chat-container">
                        <div className="chat-header">
                            {activeConversation ? activeConversation.name : 'Chat History'}
                        </div>
                        <div className="chat-body">
                            {activeConversation && activeConversation.messages && activeConversation.messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender === props.currUser.uid ? 'sender' : ''}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chat-footer">
                            <input
                                className="chat-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                            />
                            <button onClick={sendMessage} className="chatSend">Send</button>
                        </div>
                    </div>
                </div>
            </div> </div>}
            {!isLoggedIn &&  <SignInPage/>}
            </main>

    );
};

