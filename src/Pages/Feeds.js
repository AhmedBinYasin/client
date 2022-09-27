import React from 'react'
import Post from './../Components/Post';
import ProfileNev from '../Components/ProfileNev'


function Feeds() {
  return (
    <div  >
      <div className="row">
        <div className="col-md-3" >
          <div style={{ border: '2px solid green', borderRadius: '10px', marginLeft:"0vh",marginTop:"5vh",width:"22vw",height:'80vh',position:"fixed" }}>
            <ProfileNev />
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
          <div style={{ border: '2px solid green', borderRadius: '10px', marginLeft:"0vh",marginTop:"5vh",width:"15vw",height:'80vh',position:"fixed"  }}>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feeds
