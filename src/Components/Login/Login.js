
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }

function Login() {
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    photo:'',
    email:'',
    password:''
  })
  // const handleSIgnOut = () =>{
  //   firebase.auth().signOut()
  //   .then( res =>{
  //     const signedOutUser ={
  //       isSignedIn : false,
  //     name : '',
  //     email : '',
  //     photo : '',
  //     error : '',
  //     success: false
  //     }
  //     setUser(signedOutUser);

  //   })
  //   .catch( err=>{
  //     console.log(err)
  //   })
  // }
  const handleSubmit = (event) =>{
    if(newUser && user.email && user.password){
      console.log('submitting')
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  // .then((userCredential) => {
  //   // Signed in 
  //   var user = userCredential.user;
  //   console.log(user)
  //   // ...
  // })
  .then(res=>{
    const newUserInfo = {...user};
    newUserInfo.success= true;
    newUserInfo.error= '';
    // setUser(newUserInfo);
    // updateUserName(user.name); 
    setLoggedInUser(newUserInfo);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    const newUserInfo = {...user};
    newUserInfo.error = errorMessage;
    newUserInfo.success= false;
    setUser(newUserInfo);
    // console.log(errorCode, errorMessage)
    // ..
  });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res=>{
    const newUserInfo = {...user};
    newUserInfo.success= true;
    newUserInfo.error= '';
    setUser(newUserInfo);
    history.replace(from);
    console.log (res.user)
  })
  .catch((error) => {
   
    var errorMessage = error.message;
    const newUserInfo = {...user};
    newUserInfo.error = errorMessage;
    newUserInfo.success= false;
    setUser(newUserInfo);
  });
    }
    event.preventDefault();


  }
  const handleBlur = (event) =>{
    let isFormValid = true;
    // console.log(event.target.name,event.target.value)
    if(event.target.name=== 'email'){
        const isFormValid= /\S+@\S+\.\S+/.test(event.target.value);
        console.log(isFormValid)
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && isPasswordHasNumber;
    }
    if(isFormValid){
      const newUser ={...user};
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    
    }
  }
  const updateUserName = name =>{

    const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        }).then(() => {
        console.log('successfully updated');
        }).catch((error) => {
          console.log(error);
        });  
  }
  //   const handleSignIn = () =>{
  //   firebase.auth().signInWithPopup(provider)
  //   .then(res => {
  //     const {displayName, email, photoURL} = res.user;
  //     // console.log(displayName,email);
  //     const signedInUser = {
  //       isSignedIn : true,
  //       name: displayName,
  //       photo: photoURL,
  //       email: email
  //     }
  //     setUser(signedInUser);
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //     console.log(err.message)
  //   })

   
  // }
  return (
    <div style= {{textAlign:'center'}}>
      {/* {
        user.isSignedIn ? <button onClick={handleSIgnOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <h1>Welcome, {user.name}</h1>
      } */}

      <p>Email: {user.email}</p>
      <p>Password:{user.password}</p>

      <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
      <label htmlFor="NewUser">New user sign up</label>
       <br />

      <form onSubmit={handleSubmit}>
        
        {
          newUser && <input  onBlur={handleBlur} type="text" name="name" id="" placeholder='New user name'/>
        }
        <br />
        <input onBlur={handleBlur} type="text" name="email"/>
        <br />
        <input onBlur={handleBlur} type="password" name="password" />
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p>{user.error}</p>
      {
        user.success && <p>User has been {newUser ? 'created' : 'logged in'} successfully</p>
      }

      
        
    </div>
  );
}

export default Login;
