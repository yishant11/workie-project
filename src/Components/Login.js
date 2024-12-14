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
import BGIMG from "../assets/bg_img.png";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: email.current.value,
          })
            .then(() => {
              addUser({
                name: name.current.value,
                password: password.current.value,
                email: email.current.value,
                timestamp: new Date().toLocaleString(),
              });
              console.log("Users in dataStore:", getUsers());
              navigate("/user");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          navigate("/user");
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BGIMG}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="absolute top-6 left-6 h-20 w-20 sm:h-24 sm:w-24 rounded-full z-10"
      />

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white font-serif
          sm:w-10/12 sm:p-6 sm:my-20 md:w-6/12 lg:w-3/12 md:my-28 md:p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 bg-gray-200 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full p-3 mb-4 bg-gray-200 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-200 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="w-full p-3 bg-red-600 rounded text-white font-semibold hover:bg-red-700 transition"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="mt-4 text-center cursor-pointer text-gray-400 hover:text-gray-200"
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
