import React from 'react'

function ProfileIntroBar() {
    const profileImage="/assets/ProfilePics/Ahmed Photo.jpg"
    const altImage="/assets/ProfilePics/alt.png"
    const name="Ahmed Bin Yasin"
  return (
    <div className='container' style={{marginTop:"3vh",marginLeft:"1vw",marginRight:"1vw"}}>
      <div className="col-md-6"  >
      <div className="col-md-12" >
      <img src={window.location.origin + profileImage} alt='' style={{width:"180px",height:"180px",border:"1px solid black",borderRadius:"50%"}} />
      </div>
      <div className="col-md-12" >
      <h5>{name}</h5>
      </div>
      </div>
    </div>
  )
}

export default ProfileIntroBar
