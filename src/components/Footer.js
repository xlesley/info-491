import React from 'react';

export function Footer(props) {

  return (
      <footer className="footer-content  animate__animated">
          <div className="container">
              {/* <div className="column">
                  <h2>Menu</h2>
                  <a href="#services">Services</a>
                  <a href="#work">Work</a>
                  <a href="#about">About</a>
                  <a href="#contact">Contact</a>
              </div> */}
              <div className="column">
                  <h3>Disclaimer</h3>
                  <p>PetLife is a community platform for sharing pet-related content. We do not verify the accuracy or reliability of any information posted. The content provided does not constitute veterinary advice. Use of our site is at your own risk, and we are not liable for any misinformation or damages resulting from the use of information provided by users.</p>
                  <h3>Connect with us!</h3>
                  <a href= "mailto: jingrui@uw.edu">jingrui@uw.edu</a>
                  <a href= "mailto: jingrui@uw.edu">dexinsun@uw.edu</a>
              </div>

          </div>
      </footer>
  )
}