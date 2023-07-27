import React,{useContext, useState} from 'react'
import {InputGroup , Input, Button , Card , CardBody} from 'reactstrap'
import {toast} from "react-toastify"
import  Axios  from 'axios'
import ProcessingContext from '../context/ProcessingContext'
import Repos from '../layout/Repos'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
const api = "https://api.github.com/users/";

const Home = () => {
  const [loadingBar , setLoadingBar] = useContext(ProcessingContext)
  const [inputText , changeInputText] = useState("");
  const [gitUser , setGitUser] = useState(null);
  const [user , setUser] = useContext(UserContext)
  const handleClick = (e) => {
    setLoadingBar(true);
    e.preventDefault();
    if(inputText === ""){
      toast("Search Field is Empty" , {
        type: "warning"
      })
      setLoadingBar(false);
      return
    }
    
    fetchDataFromApi();

    
  }

  const fetchDataFromApi = async () => {
    try{
        const {data} = await Axios.get(api + inputText);
        console.log(data);
        setGitUser(data);
        setLoadingBar(false);
    }catch(error){
      toast("Could not find this username " , {type : "warning"});
      setLoadingBar(false);
      setGitUser(null);
    }
  }

  return (
    (user != null) ? (<div className="home">
    <div className="search">
    <InputGroup>
    <Input type='text'  placeholder='Enter Github username' value={inputText} onChange={(e)=>changeInputText(e.target.value)}></Input>
    <Button className="btn btn-outline-warning" style={{height:"40px",marginTop:"10px"}} onClick={(e)=>handleClick(e)} >Search</Button>
  </InputGroup>
    <Card>
      <img src={gitUser != null ? (gitUser.avatar_url) : (null)} style={{borderRadius:"10px"}}/>
    </Card>
    <CardBody>
      <p className="text-primary">{gitUser != null ? ("Username : " + gitUser.login) : (null)}</p>
      <p className="text-primary">{gitUser != null ? ("Full Name : " + gitUser.name) : (null)}</p>

      <p className="text-primary" style={{width:"500px"}}>{gitUser != null ? ("Bio : " + gitUser.bio) : (null)}</p>
      <p className="text-warning">{gitUser != null ? (gitUser.hireable) : (null)}</p>
    </CardBody>
    </div>
    <div className="results">
      <Repos api = {gitUser != null ? gitUser.repos_url : null} />
    </div>
  </div>) : ( <Navigate to="/signup" />)



  )
}

export default Home