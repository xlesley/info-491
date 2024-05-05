import React from 'react';

export function Footer(props) {

  return (
      <footer className="footer-content  animate__animated">
          <div className="container">
              <div className="column">
                  <h2>Menu</h2>
                  <a href="#services">Services</a>
                  <a href="#work">Work</a>
                  <a href="#about">About</a>
                  <a href="#contact">Contact</a>
              </div>
              <div className="column">
                  <h2>Social</h2>
                  /* TODO: Change to actual account when we got one */
                  <a href="https://instagram.com">Instagram</a>
                  <a href="https://facebook.com">Facebook</a>
              </div>

          </div>
      </footer>
  )
}