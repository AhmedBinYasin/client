import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom'

function PostView() {
  const name = "ahmed";
  const profileImage = "../assets/ProfilePics/Ahmed Photo.jpg"
  const age = "20h";
  const title = "Enjoy Life! No matter what you have!!";
  const imageName = "imageName";
  const imageUrl = "../assets/ProfilePics/Ahmed Photo.jpg";
  const discription = "This is the life. Enjoy every bit of it. #Sand #Enjoy #life";
  const likesCount = "16";
  const sharesCount = "16";
  const [comments, setComments] = useState(["c1", "c2", "c3"]);

  const [newComment, setNewComment] = useState('');

  function comentOnChange(event) {
    setNewComment(event.target.value)
  }

  const onCommentButtonPressed = (event) => {
    event.preventDefault();
    if (newComment!='') {setComments([...comments, newComment])}
  };
  let i = 1;
  return (
    <div className='container m-3' style={{ border: '2px solid black', borderRadius: '10px', marginLeft: "0vh", marginTop: "100%", width: "98vw", height: '86vh', position: "fixed", marginTop: "2vh", border: "1px solid black", padding: "10px", boxShadow: "1px 1px 5px #888888", borderRadius: "10px" }} >
      <div className='row'>
        <div className='col-md-8' style={{ border: '1px solid black', borderRadius: '5px', textAlign: 'initial' }}>
          <div className='row'>
            <div className='col-md-3'>
              <img src={profileImage} alt="" style={{ marginTop: '10px', width: "80px", height: "80px", border: "1px solid black", borderRadius: "50%" }} />
            </div>
            <div className='col-md-6'>
              <h5 style={{ marginTop: '5vh' }}>{name}</h5>
            </div>
          </div>
          <div style={{ borderTop: '1px solid black' }}>
            <div className="my-1">
              <img alt={imageName} src={imageUrl} style={{ width: "100%", height: '65vh', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
        <div className='col-md-4' style={{ border: '1px solid black', borderRadius: '5px' }}>
          <h5 className="card-title"> {title} </h5>

          <p style={{ fontSize: "bold" }}>{discription}</p>
          <div className='row'>
            <div className='col-md-2'>
              <p>{age}</p>
            </div>
            <div className='col-md-10' style={{ background: "", display: "flex", flexDirection: "row-reverse" }}>
              {likesCount}Likes {comments.length} comments {sharesCount} shares
            </div>
          </div>
          <div style={{ background: "", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
            <a href="" onClick={(e) => onCommentButtonPressed(e)}>
              <span style={{ position: "absolute" }}>
                <i className="material-icons">thumb_up</i>
              </span>
              <span style={{ marginLeft: 30 }}>Like</span>
            </a>
            <a href="" data-bs-toggle="collapse" data-bs-target={"#collapse" + i} aria-expanded="false" aria-controls="collapse" onClick={(e) => onCommentButtonPressed(e)}>
              <span style={{ position: "absolute" }}>
                <i className="material-icons">comment</i>
              </span>
              <span style={{ marginLeft: 30 }}>Comment</span>
            </a>
            <a href="#asd" onClick={(e) => onCommentButtonPressed(e)}>
              <span style={{ position: "absolute" }}>
                <i className="material-icons">share</i>
              </span>
              <span style={{ marginLeft: 30 }}>Share</span>
            </a>
          </div>
          <div style={{ height:'40vh',overflowY :'scroll'}}>
            {
              comments.length > 0 ? comments.map((c) => {
                return <div className='m-2' style={{ boxShadow: "2px 1px 5px 2px #888888", borderRadius: '10px' }}>{c}</div>;
              }) : ""
            }</div>
          <div className='row' >
            <div className='col-md-10'>
              <input type="text" placeholder="add a comment" onChange={(e)=>{comentOnChange(e)}}/>
            </div>
            <div className='col-md-2'>
              <button className="btn btn-primary btn-lg btn-block" onClick={(e) => { onCommentButtonPressed(e) }}><i className="material-icons">comment</i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostView
