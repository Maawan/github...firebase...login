import React, { useContext } from 'react'
import Loader from 'react-spinner-loader';
import ProcessingContext from '../context/ProcessingContext';
const Loading = () => {
  const [loadingBar , setLoadingBar] = useContext(ProcessingContext);
  console.log(loadingBar + " okkkk");
  return (
    <div class="spinner-outer" style={{display : loadingBar ? "flex" : "none"}}>
        <div class="spinner-inner">
            <Loader show = {true} style={{marginTop:"10px"}}>Processing</Loader>
            <p id="pro">Processing</p>
        </div>
    </div>
  )
}

export default Loading