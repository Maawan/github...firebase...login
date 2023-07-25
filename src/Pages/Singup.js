import React, { useContext, useState } from "react";
import ProcessingContext from "../context/ProcessingContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import firebaseConfig from "../config/firebaseConfig";
import "firebase/auth";
import { UserContext } from "../context/UserContext";


firebase.initializeApp(firebaseConfig)
const auth = getAuth();
const Singup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loadingBar , setLoadingBar] = useContext(ProcessingContext);
  const [user , setUser] = useContext(UserContext)
  const handleSubmit = (e) => {
    setLoadingBar(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        
        toast("You are Registered !", {
            type: "success",
          });
          setLoadingBar(false);
        const user = userCredential.user;
        setUser({
          email : user?.email,
          uid : user?.uid
        })
        navigate("/")
      })
      .catch((error) => {
        setLoadingBar(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        toast(errorMessage, {
          type: "warning",
        });
        setUser(null)
      });
  };

  return (
    <div className="con">
      <form>
        <p>Welcome</p>
        <img src="./logo.png" alt="" id="logo" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="pass"
          id="pass"
          placeholder="Enter your password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          SignUp
        </button>
        <p id="newUser">
          Already a User ?{" "}
          <Link replace to="/signin">
            Login
          </Link>
        </p>
      </form>
      
    </div>
  );
};

export default Singup;
