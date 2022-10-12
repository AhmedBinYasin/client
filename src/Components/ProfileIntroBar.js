import 'react-image-crop/dist/ReactCrop.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import ReactCrop from 'react-image-crop';
import axios from 'axios'

function ProfileIntroBar({ userProps }) {
  const profilePicturePath = '../assets'
  const [bioData, setBioData] = useState({
    id: userProps.user.Email,
    image: '/ProfilePics/alt.png',
    fName: '',
    mName: '',
    lName: '',
    gender: 'Male',
    dateOfBirth: '',
    address: '',
    country: { name: '', isoCode: '' },
    state: { name: '', isoCode: '' },
    city: '',
    zip: '',
    publicAck: false,
    saveAck: false
  })

  let getUserBioData = async () => {
    let bioDataResponce = await axios.post(`http://localhost:5000/api/bioData/ViewBioData`, { Email: userProps.user.Email }).catch((err) => console.log(err))
    setBioData(bioDataResponce.data)
  }


  useEffect(() => {
    getUserBioData()
  }, [])

  const profileImage = "/assets/ProfilePics/Ahmed Photo.jpg"
  const altImage = "/assets/ProfilePics/alt.png"
  const name = "Ahmed Bin Yasin"
  return (
    <div className='' style={{ marginTop: "3vh", marginLeft: "1vw", marginRight: "1vw" }}>
      <div className='row'>
        <div className="col-md-3"  style={{borderRight:'2px solid black'}}>
          <div className="col-md-12" >
            <ReactCrop aspect={16 / 16}><img className="d-block mx-auto mb-4" src={profilePicturePath + bioData.image} alt="" style={{ width: "10vw", height: "10vw", border: "1px solid black", borderRadius: "50%" }} /></ReactCrop>
          </div>
          <div className="col-md-12" >
            <h5>{userProps.user.Name}</h5>
          </div>
        </div>
        <div className='col-md-9'>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="firstName">First name</label>
              <h5>{bioData.fName}</h5>
            </div>
            <div className="col-md-3">
              <label htmlFor="firstName">Middle name</label>
              <h5>{bioData?.mName}</h5>
            </div>
            <div className="col-md-3">
              <label htmlFor="lastName">Last name</label>
              <h5>{bioData.lName}</h5>
            </div>
            <div className="col-md-3">
            <label htmlfor="gender">Gender</label>
              <h5>{bioData.gender}</h5>
            </div>
            <div className="col-md-3">
            <label htmlfor="age">Date of birth</label>
              <h5>{bioData.dateOfBirth}</h5>
            </div>
            <div className="col-md-6">
            <label htmlfor="address">Address</label>
              <h5>{bioData.address}</h5>
            </div>
            <div className="col-md-3">
              <label htmlFor="lastName">City</label>
              <h5>{bioData.city}</h5>
            </div>
            <div className="col-md-4 mb-4">
            <label htmlfor="country">Provence</label>
              <h5>{bioData.state.name}</h5>
            </div>
            <div className="col-md-4 mb-4">
            <label htmlfor="country">Country</label>
              <h5>{bioData.country.name}</h5>
            </div>
            <div className="col-md-4 mb-4">
            <label htmlfor="country">Zip</label>
              <h5>{bioData.zip}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileIntroBar
