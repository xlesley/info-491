// Pet.js

import React, { useState } from "react";
import { Main } from './Main';
import '../SliderStyle.css';
import '../styles.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const petStyles = {
    container: {
        //display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%"

    },
    image: {
        display: "block",
        width: "100%",
        height: "auto",
        textAlign: "center",
        margin: "0",
    },
    menu:{

    },
    menuContainer:{
        display: "flex",
        flexDirection: "column",
    },
    search:{
        width: "100%",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "10px",
        padding: "10px",
    },
};
const PetPage=({ handlePageChange,props })=>{

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');

    const [breed, setBreed] = useState('');
    const [petType, setPetType] = useState('');


    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        handlePageChange(menu);
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleLikeClick = (cardId) => {
        // Handle like button click for a specific card
    };

    const [selectedSvg, setSelectedSvg] = useState(null);


    const handleClick = (svgName) => {
        setSelectedSvg(svgName);
        setPetType(svgName === 'svg1' ? 'Dog' : 'Cat');
    };

    const [weight, setWeight] = useState(5);

    const handleChange = (event) => {
        setWeight(event.target.value);
    };
    const handleBreedChange = (e) => {
        setBreed(e.target.value);
    };

    const handleSubmit =  async () => {
        try {
            const storageRef = firebase.storage().ref();
            const profileData = {
                name: name,
                birthday: birthday,
                weight: weight,
                breed,
                petType,
            }
            await firebase.database().ref('pets').child(props.currUser.uid).set(profileData);
            setSubmitSuccess(true); // Set submission success status to true
        } catch (error) {
            console.error(error);
        }
    };


    return(

        <main>
            <div className="pet_label">Name of Pet </div>
            <div ><input type="text" className="pet_input" value={name} onChange={(e) => setName(e.target.value)} /> </div>
            <div className="pet_label">Birthday</div>
            <div ><input type="text" className="pet_input" value={birthday} onChange={(e) => setBirthday(e.target.value)} /></div>
            <div className="pet_label">Breed</div>
            <div><select  className="pet_input" style={ {height: "40px"}} onChange={handleBreedChange}><option value="Siamese">Siamese</option>
                <option value="Persian">Persian</option></select> </div>

            <div style={{ display: 'flex', justifyContent: 'space-around'}} className="pet_label">
                <div
                    onClick={() => handleClick('svg1')}
                    style={{
                        border: selectedSvg === 'svg1' ? '2px solid red' : 'none',
                        cursor: 'pointer',
                        display: 'inline-block'
                    }}>
                    <div style={{width:'200px',display: 'flex',alignItems:'center',justifyContent: 'center',height:'100%'}}>
                        <img src="./img/main/dog.svg" alt="SVG 1" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dogs
                    </div>
                </div>

                <div
                    onClick={() => handleClick('svg2')}
                    style={{
                        border: selectedSvg === 'svg2' ? '2px solid red' : 'none',
                        cursor: 'pointer',
                        display: 'inline-block',
                    }}>
                    <div style={{width:'200px',display: 'flex',alignItems:'center',justifyContent: 'center',height:'100%'}}>
                        <img src="./img/main/cat.svg" alt="SVG 2" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cats
                    </div>
                </div>
            </div>

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
            >Save</button>
            {submitSuccess && <div className="success-popup">Success</div>}

        </main>

    );
};


export function Pet(props){
    const [currentPage, setCurrentPage] = useState("PetPage");
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div >
            {currentPage === "PetPage" && <PetPage   handlePageChange={handlePageChange} props={props} />}
            {currentPage === "Main" && <Main />}
        </div>
    );
};

