import React from 'react'
import Post from './../Components/Post';
import ProfileNev from '../Components/ProfileNev'
import ActivityNev from '../Components/ActivityNev';


function Feeds({userProps}) {
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
          <Post/>
          <Post/>
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
