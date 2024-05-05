import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {EmailAuthProvider, getAuth, GoogleAuthProvider} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export function SignInPage (props) {
    const navigate = useNavigate();
    const firebaseUIConfig = {
        signInOptions: [ //array of sign in options supported
        //array can include just "Provider IDs", or objects with the IDs and options
        GoogleAuthProvider.PROVIDER_ID,
        { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
        ],
        signInFlow: 'popup', //don't redirect to authenticate
        credentialHelper: 'none', //don't show the email account chooser
        callbacks: { //"lifecycle" callbacks
        signInSuccessWithAuthResult: () => {
            navigate('/main');
            return false; //don't redirect after authentication
        }
        }
  }
    return (
        <div className='signin-card-main-wrap'>
            <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={firebaseUIConfig}></StyledFirebaseAuth>
        </div>

    )
}

