import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import firebase from "firebase/compat/app";
import "firebase/auth";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Singup";
import Pagenotfound from "./Pages/Pagenotfound";
import { UserContext } from "./context/UserContext";
import Footer from "./layout/footer";
import NavBar from "./layout/navbar";
import firebaseConfig from "./config/firebaseConfig";
import Loading from "./layout/Loading";
import ProcessingContext from "./context/ProcessingContext";
firebase.initializeApp(firebaseConfig);


function App() {
  const user = useState(null);
  const loadingBar  = useState(false);
  return (
    
    <ProcessingContext.Provider value={loadingBar}>
    <Router>
      <Loading />
      <ToastContainer />
      <UserContext.Provider value={user}>
        
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Pagenotfound />} />
        </Routes>

        <Outlet />
        <Footer />
      </UserContext.Provider>
    </Router>
      </ProcessingContext.Provider>
  );
}

export default App;
