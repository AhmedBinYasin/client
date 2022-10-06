import "../CSS/materialize.css";
import "../CSS/materializeIcon.css";
import React from "react";
import { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Post({ feed,userProps }) {
    let navigate = useNavigate(); 
    const [bioData,setBioData]=useState()
    const age = "9d";
    const title = feed.Title;
    const Fields = feed.Fields;
    const Type = feed.Type;
    const imageName = feed.Title;
    const imageUrl = "../assets" + feed.FileContent;
    const discription = feed.TextContent;
    const likesCount = "16";
    const sharesCount = "16";
    const [comments, setComments] = useState([]);
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = () => {setIsHover(true);};
    const handleMouseLeave = () => { setIsHover(false); };
    const boxStyle = {color: isHover ? 'lightblue' : 'rgb(0, 191, 255)'};

    let getUserBioData =async () => {
        let bioDataResponce=await axios.post(`http://localhost:5000/api/bioData/GetPhoto`, {Email:feed.UploadsRelation}).catch((err) => console.log(err))
        console.log(bioDataResponce.data,userProps)
        setBioData({
            profileImage:"../assets" +bioDataResponce.data,
            name:userProps.user.Name,
        })
      }

    useEffect(() => {
        getUserBioData()
      }, [])
    

    const onCommentButtonPressed = (event) => {
        console.log("pressed");
        event.preventDefault();
    };
    let i = 1;
    function ContentSelector() {
        if (Type == '1' || Type == '3') {console.log(Type);return <img alt={imageName} src={imageUrl} /> }
        else if (Type == '2') {console.log(Type);
            return (
                <video width="400" height="300" controls>
                    <source src={imageUrl} type="video/mp4" />
                </video>
            )
        }
    }
    return (
        <div className="postCard">
            <div className="card home-card">
                <div>
                    <span style={{ position: "absolute", marginLeft: "-19vw" }}>
                        <Link to=""><img src={bioData?.profileImage} alt='' style={{ marginTop: '15px', width: "80px", height: "80px", border: "1px solid black", borderRadius: "50%" }} /></Link>
                    </span>
                    <span style={{ position: "absolute", color: "blue", marginTop: "25px", marginLeft: "-12vw" }}>
                        {bioData?.name}
                        {" "}
                    </span>
                    <span style={{ position: "absolute", color: "grey", marginTop: "40px", marginLeft: "-12vw" }}>
                        {age}
                        <i className="material-icons tiny">public</i>
                    </span>
                </div>
                <br />
                <div style={{ flex: 1, background: "", marginTop: "70px", marginLeft: "20px", marginRight: "20px" }}>
                    <span className="card-title" style={boxStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(e)=>{e.preventDefault();navigate('/Pages/PostView',{state:{ name:bioData.name, image:bioData.profileImage, age:age, title:title, Fields:Fields, Type:Type, imageName:imageName, imageUrl:imageUrl, discription:discription, likesCount:likesCount, sharesCount:sharesCount, comments:comments }})}}> {title} </span>
                    <div className="card-image" > {ContentSelector()} </div>
                    <div className="card-content">
                        <p style={{ fontSize: "bold" }}> {discription} </p>
                    </div>
                    <div style={{ background: "" }}>
                        <div style={{ background: "", borderBottom: "1px solid #DADDD5", borderBottomWidth: "thin", margin: "0px 20px 10px 20px", padding: "0px 0px 5px 0px" }}>
                            <div style={{ background: "", display: "flex", flexDirection: "row", marginLeft: 20, position: "absolute" }}>
                                <span style={{ display: "flex", flexDirection: "row" }}>
                                    <i className="material-icons blue-text">thumb_up</i>
                                    <i className="material-icons red-text">favorite</i>
                                    <i className="material-icons blue-text">mood</i>
                                </span>
                            </div>
                            <div style={{ background: "", display: "flex", flexDirection: "row-reverse", marginRight: 20, marginLeft: 20 }}>
                                {likesCount}Likes {comments.length} comments {sharesCount} shares
                            </div>
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
                    <div className="collapse" id={"collapse" + i}>
                        {
                            comments.length > 0 ? comments.map((c) => {
                                return <div>{c}</div>;
                            }) : ""
                        }
                        <form onSubmit={(e) => { e.preventDefault(); console.log(e.target[0].value); const val = e.target[0].value; setComments(val); console.log(comments); }}>
                            <input type="text" placeholder="add a comment" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
