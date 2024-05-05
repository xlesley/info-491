import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import {SignInPage} from "./SignIn";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function NavBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user has loginin")
        setIsLoggedIn(true);
      } else {
        console.log("user not loginin")
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);



  return (
    <header>
      <nav className="navbar">
        <div ><Link to="/Onboard" className="logo" id="logoSelf">PetLife</Link></div>
        <ul className="nav-links" id="logo-text">
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/chat">Chat</Link></li>
        </ul>
        <div className="auth">

          {!isLoggedIn &&
              <Link to="/sign-in" id="login_button">Login</Link>}
              <Link to="/create-profile"  className="signup-button">Create a Profile</Link>
            <div className="separator"></div>
          {isLoggedIn &&
          <div className="profile-icon">
            <Link to="/my-profile">
              <img src="../img/profile-icon.jpg" alt="Profile"
                   style={{backgroundSize: "cover", backgroundPosition: "center", width: "33px", height: "33px"}}/>
            </Link>
          </div>
          }

        </div>

      </nav>
    </header>

  );
}