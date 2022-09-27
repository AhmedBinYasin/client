import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function ProfileNev() {
    const profileImage="/assets/ProfilePics/Ahmed Photo.jpg"
    const altImage="/assets/ProfilePics/alt.png"
    const name="Ahmed Bin Yasin"
  return (
    <div className="row" >
      <div className="col-md-3" style={{marginTop:"10px"}}>
      <Link to="/Pages/ProfileView"><img src={window.location.origin + profileImage} alt='' style={{width:"80px",height:"80px",border:"1px solid black",borderRadius:"50%"}} /></Link>
      </div>
      <div className="col-md-12">
        <Link to="/Pages/ProfileView"><h5>{name}</h5></Link>
      </div>
      <hr style={{width:"80%",marginLeft:"5%"}}/>
    </div>
  )
}

export default ProfileNev
