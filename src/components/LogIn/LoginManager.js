import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';


export const initializeLoginFramework = () =>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }
}
    
export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const{displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser
    //   setLoggedInUser(signedInUser)
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }

  export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then(res => {
      const signOutUser ={
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      return signOutUser
    })
    .catch((error) => {
      console.log(error)
    });
  }


  export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;  
    updateUserName(name)  
    return newUserInfo     
  })
  .catch((error) => {
    const newUserInfo ={};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo
  });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      
      return newUserInfo
    })
    .catch((error) => {
      const newUserInfo ={};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = (name) =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(() => {
      console.log('user name update successfully')
    }).catch((error) => {
      console.log(error)
    });  
  }
const LoginManager = () => {
    

    return (
        <div>
            
        </div>
    );
};

export default LoginManager;