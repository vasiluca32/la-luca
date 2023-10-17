import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { analytics, auth } from '../firebase/firebase';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { logEvent } from 'firebase/analytics';

const AuthContext = createContext(null);

// function to get access to context more easily
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  // performs the action to send a login link to the provided email
  function signUp(email) {
    const actionCodeSettings = {
      // url: 'https://la-luca.web.app/', //PROD purposes
      url: 'http://localhost:3000/', //DEV purposes
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // performing the login action on the same device and on other device by asking for email via window.prompt
  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db);

    //start app loads count in database
    get(child(dbRef, 'appLoads/'))
      .then((snapshot) => {
        // console.log(snapshot.val());
        const currentLoad = snapshot.val();
        const newLoad = {
          appLoads: currentLoad + 1,
        };
        update(ref(db), newLoad);
      })
      .catch((error) => {
        console.error(error);
      });
    // end app loads

    // start analytics
    logEvent(analytics);
    // end analytics

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  //watching the authentication state on all tabs
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
        user
          .getIdTokenResult()
          .then((idTokenResult) => {
            if (!!idTokenResult.claims.admin) {
              setRole(idTokenResult.claims.admin);
            } else {
              setRole(null);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, []);

  // logs out a user from application
  function logOut() {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setRole(null);
      })
      .catch((error) => {
        alert('Error');
        console.log(error);
      });
  }

  // context data, may need to add shopping cart, roles, etc
  const value = {
    currentUser,
    role,
    signUp,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
