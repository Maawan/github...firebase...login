import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { Link, useNavigate} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import firebase from "firebase/compat/app";
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";
import { toast } from "react-toastify";
import ProcessingContext from "../context/ProcessingContext";
firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const NavBar = () => {
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [loadingBar , setLoadingBar] = useContext(ProcessingContext)
  const toggle = () => setIsOpen(!isOpen);

  const handleSignOut = (e) => {
    setLoadingBar(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        toast("Signed out Successfully !!!" , {
            type : "success"
        })
        navigate("/");
        setLoadingBar(false);
      })
      .catch((error) => {
        toast("Unable to signout" , {
            type : "warning"
        })
        setLoadingBar(false);
      });
  };

  return (
    <Navbar color="info" light expand="md">
      <NavbarBrand>
        <Link to="/" className="text-white">
          LCO
        </Link>
      </NavbarBrand>
      <NavbarText className="text-white">
        {user?.email ? user.email : ""}
      </NavbarText>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {user ? (
            <NavItem>
              <NavLink
                tag={Link}
                to="/"
                className="text-white"
                onClick={(e) => handleSignOut(e)}
              >
                Logout
              </NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem className="text-white">
                <NavLink tag={Link} to="/signup" className="text-white">
                  SignUp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signin" className="text-white">
                  SignIn
                </NavLink>
              </NavItem>
            </>
          )}
          {user ? (
            <NavItem>
              <p className="text-warning">Welcome {user.email}</p>
            </NavItem>
          ) : (
            <NavItem>
              <p className="text-warning">Please Signin or Signup</p>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default NavBar;
