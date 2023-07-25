import React , {useState , useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import "firebase/auth";
import firebaseConfig from '../config/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import ProcessingContext from '../context/ProcessingContext';
import { UserContext } from '../context/UserContext';



firebase.initializeApp(firebaseConfig)
const auth = getAuth();

const Signin = () => {
  const navigate = useNavigate();

  const [email , setEmail] = useState("");
  const [pass , setPass] = useState("");
  const [loadingBar , setLoadingBar] = useContext(ProcessingContext)
  const [user , setUser] = useContext(UserContext);
  const handleClick = (e) => {
    setLoadingBar(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    setLoadingBar(false);
    toast("Congratulations !!!" , {
      type:"success"
    })
    const user = userCredential.user;
    console.log(user?.email + " " + user?.uid);
    setUser({
      email : user?.email,
      uid : user?.uid
    })
    navigate("/")
  })
  .catch((error) => {
    toast("Oops ! There is some Issue" , {type : "warning"});
    setLoadingBar(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast(errorCode + " " + errorMessage , {type : "warning"});
    setUser(null);
  });


  }
  return (
    <div className="con">
    <form>
        {
          user ? (<redirect to="/" />) : (console.log("Log In"))
        }
        <p>Welcome back !</p>
        <img src="./logo.png" alt="" id="logo" />
        <input type="email" name="email" id="email" placeholder="Enter your email" value={email}
        onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" name="pass" id="pass" placeholder="Enter your password" value={pass}
        onChange={(e) => setPass(e.target.value)}/>
        <button type="submit"
        onClick={(e) => handleClick(e)}>Login</button>
        <p id="newUser">New User ? <Link to="/signup" replace>Signup</Link></p>
    </form>
    </div>
  )
}

export default Signin