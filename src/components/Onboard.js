import React from 'react';
import '../styles.css';

export function  Onboard (){
    return (
        <>

            <main>
                <section className="main1">
                    <h1 className="title">PetLife</h1>
                    <p>Explore a vibrant online space dedicated to all things pet-related.</p>
                </section>

                <section className="services-section  animate__animated">
                    <h2>Our Features</h2>
                    <div className="services-container">
                        <div className="service-item">
                            <img src="./img/onboard/020.svg" alt="Decks and Patios" />
                            <h3>Top Tips for New Pet Parents</h3>
                        </div>
                        <div className="service-item">
                            <img src="./img/onboard/005.svg" alt="Outdoor Spaces" width="300" height="300" />
                            <h3>Pet Health & Wellness Resources</h3>
                        </div>
                        <div className="service-item">
                            <img src="./img/onboard/021.svg" alt="Custom Additions" />
                            <h3>Upcoming Pet Events & Meetups</h3>
                        </div>
                        <div className="service-item">
                            <img src="./img/onboard/022.svg" alt="Green Building" />
                            <h3>Share Your Pet's Funniest Moment</h3>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
};

