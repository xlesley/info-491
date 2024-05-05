// Main.js

import React, { useState,useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import { useNavigate } from 'react-router-dom';
import { hover } from "@testing-library/user-event/dist/hover";

const mainStyles = {

    menu:{

    },
    menuContainer:{
        display: "flex",
    },
    search:{
        width: "100%",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "10px",
        padding: "10px",
    },
    menuText:{
        marginLeft: "30px",
        color:"#0f0f0f",
        fontWeight: "bold"
    }
};


export function Main(props){
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const [cardsData, setCardsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const postsRef = firebase.database().ref('posts');
        const unsubscribe = postsRef.on('value', (snapshot) => {
            const posts = snapshot.val();
            const postsList = [];
            for (let id in posts) {
                //postsList.push({ id, ...posts[id] });
                if (posts[id].title.toLowerCase().includes(searchInput.toLowerCase())) {
                    postsList.push({ id, ...posts[id] });
                }
            }
            setCardsData(postsList);
        });

        return () => postsRef.off('value', unsubscribe);
    }, [searchInput]);



    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyDown = (e) => {

        if (e.keyCode === 13) {
            e.preventDefault();

        }
    };
    const handleCardClick = (card) => {
        navigate(`/comment/${card.id}`, { state: { card } });
    };

    return(
        <div style={{ display: "flex",width:"100%" }}>

            <div style={{ width: "100%", padding: "20px",height:"100%",display: "flex", flexDirection: "column",justifyContent: "center",alignItems:"center" }}>

                <div style={{ marginBottom: "20px",width:"50%",height:"50px",alignItems:"center",display:"flex" }} >
                    <input type="text" value={searchInput} onChange={handleSearchInputChange} style={mainStyles.search} placeholder="Search..."  onKeyDown={handleKeyDown} id="searchPlaceholder"/>
                </div>

                <div style={{ padding: "10px"}}>
                    <div style={{ display: "flex", flexWrap: "wrap" }} className="posts">
                        {cardsData.map((card) => (
                            <div key={card.id} style={{ width: "22%", margin: "10px", border: "0px solid #ccc", padding: "10px",display: "flex", flexDirection: "column" }} class="singlePost">
                                <img src={card.picture} alt="Card" style={{ width: "100%", height: "auto" }} onClick={() => handleCardClick(card)}/>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={card.avatar}  style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />
                                        <span style={{fontWeight: "bold"}}>{card.title}</span>
                                    </div>

                                </div>


                                <span style={{marginLeft:"35px",fontSize: "10px",marginTop:"5px",color:"#333333"}}>{card.content}</span>
                                <div >
                                    <span style={{marginLeft:"35px",fontSize: "10px",marginTop:"5px",color:"#333333"}}>{card.uname}</span><img src='./img/main/icon1.svg' style={{ width: "15px", height: "20px", borderRadius: "50%", marginLeft: "10px",paddingTop: "5px" }}/>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

