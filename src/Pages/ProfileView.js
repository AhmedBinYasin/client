import React from 'react'
import ActivityNev from '../Components/ActivityNev'
import Post from './../Components/Post';
import ProfileIntroBar from '../Components/ProfileIntroBar'
import ProfileNev from '../Components/ProfileNev'

function ProfileView() {
    
    return (
        <>
            <div className="m-3" style={{ margin: '0px' }}>
                <div className="row">
                    <div className="col-md-9" style={{ marginTop: "2vh", border: "1px solid black", padding: "10px", boxShadow: "2px 2px 12px 5px #888888", borderRadius: "10px" }}>
                        <ProfileIntroBar />
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-2" style={{ marginLeft: '0vh' }}>
                        <ActivityNev />
                    </div>
                </div>
                <div className="row">
                <div className='col-md-3 sticky-div' style={{ border: '2px solid green', borderRadius: '10px', marginLeft: "0vh", marginTop: "5vh", width: "22vw", height: '80vh', position: "relative", marginTop: "2vh", border: "1px solid black", padding: "10px", boxShadow: "2px 2px 12px 5px #888888", borderRadius: "10px" }}>
                    <ProfileNev />
                </div>
                <div className='col-md-5' style={{position:'relative' ,marginLeft:"0vw"}}>
                <Post/>
                <Post/>
                </div>
                </div>
            </div>
        </>
    )
}

export default ProfileView
