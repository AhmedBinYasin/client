import React from 'react'
import Nevbar from './../Components/Nevbar'
import axios from 'axios'
import { Outlet } from "react-router-dom"


function Main(props) {
  let userProps = props.userProps
  let logOut=async function logout(){
    if(userProps.user.Role==="skiped"){
      let responseData = await axios.post(`http://localhost:5000/api/auth/setRole`, { Email: userProps.user.Email,Role:"new" }).catch((err) => console.log(err))
    if (responseData.data === "success") {
      props.setUserProps('')
    }
    }
    else{
      props.setUserProps('')
    }
  }
  return (
    <><div className='nevbarDiv' style={{zIndex:"2", position:"relative"}}>
      <Nevbar title={'Plant++'} userProps={userProps} logOut={logOut}/>
    </div>
    <Outlet/>
    </>
  )
}

export default Main
