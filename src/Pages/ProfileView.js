import React from 'react'
import ActivityNev from '../Components/ActivityNev'
import Post from './../Components/Post';
import ProfileIntroBar from '../Components/ProfileIntroBar'
import ProfileNev from '../Components/ProfileNev'
import { useEffect } from 'react'

function ProfileView() {
    useEffect(() => {
        let stickyElem = document.querySelector(".sticky-div");
        let adjest=document.querySelector(".offsetAdject");
        let currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset;
        window.addEventListener("scroll",(e)=>{
            if(window.pageYOffset+80 > currStickyPos) {
                stickyElem.style.position = "fixed";
                stickyElem.style.top = "70px";
                adjest.style.marginLeft="28vw"
            } else {
                stickyElem.style.position = "relative";
                stickyElem.style.top = "initial";
                adjest.style.marginLeft="13vh"
            }
        })
      }, [])
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
                <div className='col-md-3 sticky-div' style={{ border: '2px solid green', borderRadius: '10px', marginLeft: "0vh", marginTop: "5vh", width: "22vw", height: '80vh', position: "relative", marginTop: "2vh", border: "1px solid black", padding: "10px", boxShadow: "2px 2px 12px 5px #888888", borderRadius: "10px" ,}}>
                    <ProfileNev />
                </div>
                <div className='col-md-5 offsetAdject' style={{position:'relative' ,marginLeft:"10vw"}}>
                <Post/>
                <Post/>
                </div>
                </div>
            </div>

        </>
    )
}

export default ProfileView
