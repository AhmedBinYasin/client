import React from 'react'
import Post from './../Components/Post';
import ProfileNev from '../Components/ProfileNev'
import ActivityNev from '../Components/ActivityNev';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Feeds({userProps}) {
  const [feeds, setFeeds] = useState([])
  let getUserFeedData=async()=>{
    let Responce=await axios.post(`http://localhost:5000/api/post/GetFeeds`,).catch((err) => console.log(err))
    setFeeds(Responce.data)
  }
  useEffect( () => {
    getUserFeedData()
  }, [])
  function FeedsTable(){
    let feedsTable=feeds?.map(function (feed) {
      return (
        <Post feed={feed} userProps={userProps}/>
      )
    })
    return feedsTable
  }
  return (
    <div  >
      <div className="row">
        <div className="col-md-3" >
          <div style={{ border: '2px solid green', borderRadius: '10px', marginLeft:"0vh",marginTop:"5vh",width:"22vw",height:'80vh',position:"fixed",marginTop:"2vh",border:"1px solid black",padding: "10px",boxShadow: "2px 2px 12px 5px #888888",borderRadius:"10px" }}>
            <ProfileNev userProps={userProps} />
          </div>
        </div>
        <div className="col-md-1" >
        </div>
        <div className="col-md-5" style={{marginTop:"5vh",zIndex:"1",}}>
          {FeedsTable()}
        </div>
        <div className="col-md-1" >
        </div>
        <div className="col-md-1" >
          <ActivityNev/>
        </div>
      </div>
    </div>
  )
}

export default Feeds
