import React from 'react'
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom'


function PostView() {
  const location = useLocation()
  const [PostData, setPostData] = useState(location.state || '')
  const [comments, setComments] = useState(PostData.comments);

  const [newComment, setNewComment] = useState('');
  React.useEffect(() => {
    setPostData(location.state)
  }, [location.state])

  function comentOnChange(event) {
    setNewComment(event.target.value)
  }

  const onCommentButtonPressed = (event) => {
    event.preventDefault();
    if (newComment != '') { setComments([...comments, newComment]) }
  };
  let i = 1;
  function ContentSelector() {
    if (PostData.Type == '1' || PostData.Type == '3') { return <img alt={PostData.imageName} src={PostData.imageUrl} style={{ width: "100%", height: '65vh', objectFit: 'contain' }} /> }
    else if (PostData.Type == '2') {
      return (
        <video width="710" height="555" controls>
          <source src={PostData.imageUrl} type="video/mp4" />
        </video>
      )
    }
  }

  return (
    <div className='container m-3' style={{ border: '2px solid black', borderRadius: '10px', marginLeft: "0vh", marginTop: "100%", width: "98vw", height: '86vh', position: "fixed", marginTop: "2vh", border: "1px solid black", padding: "10px", boxShadow: "1px 1px 5px #888888", borderRadius: "10px" }} >
      <div className='row'>
        <div className='col-md-8' style={{ border: '1px solid black', borderRadius: '5px', textAlign: 'initial' }}>
          <div className='row'>
            <div className='col-md-3'>
              <img src={PostData.image} alt="" style={{ marginTop: '10px', width: "80px", height: "80px", border: "1px solid black", borderRadius: "50%" }} />
            </div>
            {console.log(PostData, "AJa")}
            <div className='col-md-6'>
              <h5 style={{ marginTop: '5vh' }}>{PostData.name}</h5>
            </div>
          </div>
          <div style={{ borderTop: '1px solid black' }}>
            <div className="my-1">
              {ContentSelector()}
            </div>
          </div>
        </div>
        <div className='col-md-4' style={{ border: '1px solid black', borderRadius: '5px' }}>
          <h5 className="card-title"> {PostData.title} </h5>

          <p style={{ fontSize: "bold" }}>{PostData.discription}</p>
          <div className='row'>
            <div className='col-md-2'>
              <p>{PostData.age}</p>
            </div>
            <div className='col-md-10' style={{ background: "", display: "flex", flexDirection: "row-reverse" }}>
              {PostData.likesCount}Likes {comments.length} comments {PostData.sharesCount} shares
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
          <div style={{ height: '55vh', overflowY: 'scroll' }}>
            {
              comments.length > 0 ? comments.map((c) => {
                return <div className='m-2' style={{ boxShadow: "2px 1px 5px 2px #888888", borderRadius: '10px' }}>{c}</div>;
              }) : ""
            }</div>
          <div className='row' >
            <div className='col-md-10'>
              <input type="text" placeholder="add a comment" onChange={(e) => { comentOnChange(e) }} />
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
