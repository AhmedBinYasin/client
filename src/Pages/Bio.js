
import 'react-image-crop/dist/ReactCrop.css'
import React from 'react'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import {City, Country, State} from "country-state-city";
import ReactCrop from 'react-image-crop';

function Bio({userProps ,setRole}) {
    const countries = Country.getAllCountries()
    const [bioData,setBioData]=useState({
        id:userProps.user.Email,
        image:'../assets/ProfilePics/Ahmed Photo.jpg',
        fName:'Ahmed',
        mName:'Bin',
        lName:'Yasin',
        gender:'Male',
        dateOfBirth:'1999-11-04',
        address:'22b,Iqbal Villas, Khayaban-e-Ali, Bahawalpur',
        country:{name:'Pakistan',isoCode:'PK'},
        state:{name:'Punjab',isoCode:'PB'},
        city:'Bahawalpur',
        zip:'112233',
        publicAck:false,
        saveAck:false
    })
    let crop= {
      
    }
    const states=State.getStatesOfCountry(bioData.country.isoCode)
    const cities=City.getCitiesOfState(bioData.country.isoCode,bioData.state.isoCode)

    const listOfAllCountriesSelectOptions=()=> {
        let countryOptions=countries.map(function(country){return <option key={country.isoCode} value={country.isoCode}>{country.name}</option>})
        return countryOptions
    }
    const listOfAllStatesSelectOptions=()=> {
        let statesOptions=states.map(function(state){return <option key={state.isoCode} value={state.isoCode}>{state.name}</option>})
        return statesOptions
    }
    const listOfAllCitiesSelectOptions=()=> {
        let citiesOptions=cities.map(function(city){return <option key={city.name} value={city.name}>{city.name}</option>})
        return citiesOptions
    }
    function uploadNewPicture(){
      setBioData({...bioData,image:"../assets/ProfilePics/NailPolishBlue.png"})
    }
    function save(Role){
      setRole(Role)
    }

  return (
    <div className="bg-light">
      <div className="container">
      <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src="../assets/Logo/PlantLogo.png" alt="" width="72" height="72"/>
        <h2>Add Bio</h2>
        <p className="lead">Here you can add your bio or skip</p>
      </div>
      <div className="row">
        <div className="col-md-12 order-md-1">
          <div className='row'><h4 className="mb-3">Personal Information</h4></div>
          <div className='row'><ReactCrop crop={crop} aspect={16 / 16}><img className="d-block mx-auto mb-4" src={bioData.image} alt="" style={{width:"15vw",height:"15vw",border:"1px solid black",borderRadius:"50%"}} /></ReactCrop></div>
          <div className='row'><button className="btn btn-primary btn-lg btn-block" style={{width:"15vw", marginLeft:"25vw"}} onClick={()=>{uploadNewPicture()}}>upload picture</button></div>
          <form className="">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value={bioData.fName} onChange={(e) => {setBioData({...bioData,fName:e.target.value})}}/>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="firstName">Middle name</label>
                <input type="text" className="form-control" id="middleName" placeholder="" value={bioData.mName} onChange={(e) => {setBioData({...bioData,mName:e.target.value})}}/>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value={bioData.lName} onChange={(e) => {setBioData({...bioData,lName:e.target.value})}}/>
              </div>
            </div>
            <div className="row">
            <div className="col-md-4 mb-3">
                <label htmlFor="gender">Gender</label>
                <select className="custom-select d-block w-100" id="state" defaultValue={bioData.gender} onChange={(e) => {setBioData({...bioData,age:e.target.value})}}>
                  <option  value={bioData.gender}>{bioData.gender}</option>
                  {bioData.gender == 'Male' ? (
                      <option value="Female">Female</option>
                    ) : (
                      <option value="Male">Male</option>
                    )}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="age">Date of birth</label>
                <input type="date" id="validationCustom01" value={bioData.dateOfBirth} onChange={(e) => {setBioData({...bioData,dateOfBirth:e.target.value})}}/>
                
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <div className="input-group">
                <input type="text" className="form-control" id="username" placeholder={userProps.user.Name} disabled={true}/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder={userProps.user.Email}  disabled={true}/>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={bioData.address} onChange={(e) => {setBioData({...bioData,address:e.target.value})}}/>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country" defaultValue={bioData.country.isoCode} onChange={(e) => {setBioData({...bioData,country:{name:Country.getCountryByCode(e.target.value).name , isoCode:Country.getCountryByCode(e.target.value).isoCode}})}}>
                {listOfAllCountriesSelectOptions()}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" defaultValue={bioData.state.isoCode} onChange={(e) => {setBioData({...bioData,state:{name:State.getStateByCodeAndCountry(e.target.value,bioData.country.isoCode).name, isoCode:State.getStateByCodeAndCountry(e.target.value,bioData.country.isoCode).isoCode}})}}>
                {listOfAllStatesSelectOptions()}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="city">City</label>
                <select className="custom-select d-block w-100" id="state" defaultValue={bioData.city} onChange={(e) => {setBioData({...bioData,city:e.target.value})}}>
                {listOfAllCitiesSelectOptions()}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" value={bioData.zip} onChange={(e) => {setBioData({...bioData,zip:e.target.value})}} />
              </div>
            </div>
            <hr className="mb-4"/>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="shareAck" name="shareAck"  checked={bioData.publicAck}  onClick={(e)=>{setBioData({...bioData,publicAck:e.target.checked})}}/>
              <label className="custom-control-label" htmlFor="information">I acknowledge that my information will be shared with others.</label>
            </div>
            <div className="custom-control custom-checkbox">
            <input type="checkbox" id="saveAck" name="saveAck"  checked={bioData.saveAck}  onClick={(e)=>{setBioData({...bioData,saveAck:e.target.checked})}}/>
              <label className="custom-control-label" htmlFor="save-info">I acknowledge that my information will be saved online</label>
            </div>
            <hr className="mb-4"/>
            <div className="row">
              <div className="col-md-6">
              <Link to="/" className="link-danger"><button className="btn btn-primary btn-lg btn-block"  style={{marginLeft:'25vw'}} onClick={()=>{save("approved")}} >Save</button></Link>
              </div>
              <div className="col-md-6">
              <Link to="/" className="link-danger"><button className="btn btn-primary btn-lg btn-block" onClick={()=>{save("skiped")}} >Skip</button></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Bio
