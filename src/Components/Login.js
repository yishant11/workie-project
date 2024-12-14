import { useState, useRef } from "react";
import { checkValidData } from "./Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addUser, getUsers } from "./data";
import Logo from "../assets/logo.png";
import BGIMG from "../assets/bg_img.png"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();


  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // Validate email and password
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      ).then(() => {
        // After user is created, update profile
        updateProfile(auth.currentUser, {
          displayName: email.current.value,
        })
        .then(() => {
          addUser({
            name : name.current.value,
            password: password.current.value,
            email: email.current.value,
            timestamp: new Date().toLocaleString(),
          });

          console.log("Users in dataStore:", getUsers());
            navigate('/user');
        })
        .catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        })
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          navigate("/user");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <img src = {Logo} alt="No Image" style={{height:"150px", width:"150px",borderRadius:"50%", position:"relative", top:"30px", left:"50px"}}/>
      <div className="absolute">
        <img
          src={BGIMG}
          alt="logo"
          style={{ position: "relative",top:"-150px", right: "0px",zIndex:"-1", width: "2000px", height:"100vh",marginBottom:"-150px" }}
        />
      </div>
      <form onSubmit={(e) =>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 .relative top-7 text-white font-serif">
        <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm &&
            <input 
            ref={name}
            type="Name" 
            placeholder="Full Name" 
            className="p-4 my-4 w-full bg-gray-300" 
            style={{color:"black"}}
            />}
            <input 
            ref={email}
            type="text" 
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-300"
            style={{color:"black"}} 
            />
            <input 
            ref={password}
            type="c-password" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-300"
            style={{color:"black"}} 
            />
            <p className="text-red-500 font-bold text-lg p-2 ">
                {errorMessage}
            </p>
            <button className="p-4 my-6 bg-red-600 w-full rounded-lg font-serif font-normal" 
            onClick={handleButtonClick}
            >
            {isSignInForm 
            ? "Sign In" 
            : "Sign Up"}
            </button>
            <p className="py-4 cursor-pointer" 
            onClick={toggleSignInForm}
            >
            {isSignInForm 
            ? "New Here? Sign Up Now" 
            : "Already an existing User"}
            </p>
        </form>
    </div>
  );
};
export default Login;