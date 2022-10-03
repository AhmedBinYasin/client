import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ProfileNev({userProps}) {
  
  const [profileNevPrmams,setProfileNevPrmams] = useState({
    id: userProps.user.Email,
    name: userProps.user.Name,
    profileImage: '',
  })
  let getUserImage =async () => {
    let Responce=await axios.post(`http://localhost:5000/api/bioData/GetPhoto`, {Email:userProps.user.Email}).catch((err) => console.log(err))
    setProfileNevPrmams({ ...profileNevPrmams, profileImage: Responce.data })
  }

  useEffect(() => {
    getUserImage()
  }, [])


  return (
    <div className="row" >
      <div className="col-md-3" style={{marginTop:"10px"}}>
      <Link to="/Pages/ProfileView"><img src={window.location.origin +'/assets'+profileNevPrmams.profileImage} alt='' style={{width:"80px",height:"80px",border:"1px solid black",borderRadius:"50%"}} /></Link>
      </div>
      <div className="col-md-12">
        <Link to="/Pages/ProfileView"><h5>{profileNevPrmams.name}</h5></Link>
      </div>
      <hr style={{width:"80%",marginLeft:"5%"}}/>
      <div>
        <Link to='/Pages/Bio'><h5 style={{ padding: "10px", boxShadow: "1px 1px 5px #888888", borderRadius: "10px"}}>View or Change Bio</h5></Link>
        <Link to='/Pages/ProfileView'><h5 style={{ padding: "10px", boxShadow: "1px 1px 5px #888888", borderRadius: "10px"}}>Go to Home</h5></Link>
        <Link to='/'><h5 style={{ padding: "10px", boxShadow: "1px 1px 5px #888888", borderRadius: "10px"}}>Go to MainFeeds</h5></Link>
      </div>
    </div>
  )
}

export default ProfileNev
