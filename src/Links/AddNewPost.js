import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AddNewPost({ userProps }) {
    const [ContentType, setContentType] = useState('0');
    const [file, setFile] = useState('')
    const [postData, setPostData] = useState({
        id: userProps.user.Email,
        Type: '0',
        Title: '',
        TextContent: '',
        FileContent: '',
        Fields: [],
        Activity: false,
        publicAck: false,
        saveAck: false
    })
    let navigate = useNavigate(); 
    

    const ItemImageOnChangeHandeler = (event) => { setFile(event.target.files[0]) }
    const ItemVideoOnChangeHandeler = async (event) => {
        let videoContainer = document.getElementById('VideoContainer')
        if (file != '') { videoContainer.removeChild(videoContainer.childNodes[0]) }
        let videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('width', '640');
        videoPlayer.setAttribute('height', '360');
        videoPlayer.setAttribute('controls', true);
        let videoSource = document.createElement('source');
        videoSource.setAttribute('src', URL.createObjectURL(event.target.files[0]));
        videoSource.setAttribute('type', 'video/mp4');
        videoPlayer.appendChild(videoSource)
        videoContainer.appendChild(videoPlayer);
        setFile(event.target.files[0])
    }
    const handleChange = value => {
        setContentType(value)
        setPostData({ ...postData, Type: value })
        if (value == '3') { setPostData({ ...postData, Fields: [{ FieldName: 'ScientificName', FieldValue: '' }, { FieldName: 'OrginizationName', FieldValue: '' }, { FieldName: 'Adress', FieldValue: '' }, { FieldName: 'Group', FieldValue: '' }, { FieldName: 'Growth Habit', FieldValue: '' }] }) }
        else { setPostData({ ...postData, Fields: [] }) }
        setFile('')
    };
    function FieldsUpdater(e,fieldName){
        let temp=postData.Fields
        temp[temp.findIndex(object => {return object.FieldName === fieldName})].FieldValue=e.target.value
        setPostData({...postData,Fields:temp})
        console.log(postData.Fields)
        

    }
    function FieldTableGenerator(fields) {
        let fieldsTable = fields?.map(function (field) {
            return (
                <div className='col-md-4 px-1'>
                    <label htmlFor="Title">{field.FieldName}</label>
                    <input type="text" className="form-control" id={field.FieldName} placeholder="Enter" value={postData.Fields[postData.Fields.findIndex(object => {return object.FieldName === field.FieldName})].FieldValue} onChange={(e)=>{FieldsUpdater(e,field.FieldName)}} />
                </div>
            )
        })
        return fieldsTable
    }
    async function addPostOnClickHendeler(e) {
        e.preventDefault()
        if(ContentType=='0'){
            let request={
                id:postData.id,
                Type:ContentType,
                Title:postData.Title,
                TextContent:postData.TextContent,
                Fields:postData.Fields,
                Activity:postData.Activity,
                publicAck:postData.publicAck,
                saveAck:postData.saveAck,
            }
            const res =await axios.post('http://localhost:5000/api/post/CreatePostText', request)
            if(res.data=='Success'){
                navigate('/')
            }
        }
        else if(ContentType=='1'){
            console.log(postData)
            const formData = new FormData()
            formData.append('UploadsRelation',postData.id)
            formData.append('Type',ContentType)
            formData.append('Title', postData.Title)
            formData.append('TextContent',postData.TextContent)
            formData.append('Fields',postData.Fields)
            formData.append('Activity',postData.Activity)
            formData.append('publicAck',postData.publicAck)
            formData.append('saveAck',postData.saveAck)
            formData.append('FileImage', file)
            console.log(formData.values())
            const res =await axios.post('http://localhost:5000/api/post/CreatePostImage', formData)
            if(res.data=='Success'){
                navigate('/')
            }
        }
        else if(ContentType=='2'){
            console.log(postData)
            const formData = new FormData()
            formData.append('UploadsRelation',postData.id)
            formData.append('Type',ContentType)
            formData.append('Title', postData.Title)
            formData.append('TextContent',postData.TextContent)
            formData.append('Fields',postData.Fields)
            formData.append('Activity',postData.Activity)
            formData.append('publicAck',postData.publicAck)
            formData.append('saveAck',postData.saveAck)
            formData.append('FileVideo', file)
            console.log(formData.values())
            const res =await axios.post('http://localhost:5000/api/post/CreatePostVideo', formData)
            if(res.data=='Success'){
                navigate('/')
            }
        }
        else if(ContentType=='3'){
            const formData = new FormData()
            formData.append('UploadsRelation',postData.id)
            formData.append('Type',ContentType)
            formData.append('Title', postData.Title)
            formData.append('TextContent',postData.TextContent)
            postData.Fields.forEach(x=>{
                formData.append('FieldName',x.FieldName)
                formData.append('FieldValue',x.FieldValue)
            })
            formData.append('Activity',postData.Activity)
            formData.append('publicAck',postData.publicAck)
            formData.append('saveAck',postData.saveAck)
            formData.append('FileImage', file)
            const res = await axios.post('http://localhost:5000/api/post/CreateNurseryListing', formData)
            if(res.data=='Success'){
                navigate('/')
            }
        }


    }
    function TextPost() {
        return (
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className='row'><h4 className="mb-3" style={{ textAlign: 'center' }}>Text Post</h4></div>
                    <form className="">
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Title</h5></label>
                                <input type="text" className="form-control" id="Title" placeholder="Enter Title" value={postData.Title} onChange={(e) => { setPostData({ ...postData, Title: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="TextContent"><h5>Post Content</h5></label>
                                <textarea type="text" className="form-control" id="Title" placeholder="Enter Content" value={postData.TextContent} onChange={(e) => { setPostData({ ...postData, TextContent: e.target.value }) }} style={{ height: '20vh' }} />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.Activity} onClick={(e) => { setPostData({ ...postData, Activity: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">Add to activity.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.publicAck} onClick={(e) => { setPostData({ ...postData, publicAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">I acknowledge that my information will be shared with others.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="saveAck" name="saveAck" checked={postData.saveAck} onClick={(e) => { setPostData({ ...postData, saveAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="save-info">I acknowledge that my information will be saved online</label>
                        </div>
                        <hr className="mb-4" />
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-lg btn-block" style={{ marginLeft: '25vw' }} onClick={(e) => { addPostOnClickHendeler(e) }} >Add Post</button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/" className="link-danger"><button className="btn btn-primary btn-lg btn-block" >Close</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    function ImagePost() {
        return (
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className='row'><h4 className="mb-3" style={{ textAlign: 'center' }}>Image Post</h4></div>
                    <form className="">
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Title</h5></label>
                                <input type="text" className="form-control" id="Title" placeholder="Enter Title" value={postData.Title} onChange={(e) => { setPostData({ ...postData, Title: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Image</h5></label>
                                <input className="form-control" type="file" id="formFile" accept="image/*" onChange={ItemImageOnChangeHandeler} />
                                {file != '' && (
                                    <div className='mt-5'>
                                        <img className='mx-5' src={URL.createObjectURL(file)} alt={file.name} style={{ width: '55vw', hight: '40vw' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="TextContent"><h5>Post Dicription</h5></label>
                                <textarea type="text" className="form-control" id="Title" placeholder="Enter Discription" value={postData.TextContent} onChange={(e) => { setPostData({ ...postData, TextContent: e.target.value }) }} style={{ height: '20vh' }} />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.Activity} onClick={(e) => { setPostData({ ...postData, Activity: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">Add to activity.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.publicAck} onClick={(e) => { setPostData({ ...postData, publicAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">I acknowledge that my information will be shared with others.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="saveAck" name="saveAck" checked={postData.saveAck} onClick={(e) => { setPostData({ ...postData, saveAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="save-info">I acknowledge that my information will be saved online</label>
                        </div>
                        <hr className="mb-4" />
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-lg btn-block" style={{ marginLeft: '25vw' }} onClick={(e) => { addPostOnClickHendeler(e) }} >Add Post</button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/" className="link-danger"><button className="btn btn-primary btn-lg btn-block" >Close</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    function VideoPost() {
        return (
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className='row'><h4 className="mb-3" style={{ textAlign: 'center' }}>Video Post</h4></div>
                    <form className="">
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Title</h5></label>
                                <input type="text" className="form-control" id="Title" placeholder="Enter Title" value={postData.Title} onChange={(e) => { setPostData({ ...postData, Title: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Image</h5></label>
                                <input className="form-control" type="file" id="formFile" accept="video/*" onChange={ItemVideoOnChangeHandeler} />
                                <div className='mt-5' id='VideoContainer' ></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="TextContent"><h5>Post Dicription</h5></label>
                                <textarea type="text" className="form-control" id="Title" placeholder="Enter Discription" value={postData.TextContent} onChange={(e) => { setPostData({ ...postData, TextContent: e.target.value }) }} style={{ height: '20vh' }} />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.Activity} onClick={(e) => { setPostData({ ...postData, Activity: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">Add to activity.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.publicAck} onClick={(e) => { setPostData({ ...postData, publicAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">I acknowledge that my information will be shared with others.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="saveAck" name="saveAck" checked={postData.saveAck} onClick={(e) => { setPostData({ ...postData, saveAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="save-info">I acknowledge that my information will be saved online</label>
                        </div>
                        <hr className="mb-4" />
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-lg btn-block" style={{ marginLeft: '25vw' }} onClick={(e) => { addPostOnClickHendeler(e) }} >Add Post</button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/" className="link-danger"><button className="btn btn-primary btn-lg btn-block" >Close</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    function NurseryListing() {
        return (
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className='row'><h4 className="mb-3" style={{ textAlign: 'center' }}>Nursery Listing</h4></div>
                    <form className="">
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Common Name</h5></label>
                                <input type="text" className="form-control" id="Title" placeholder="Enter Title" value={postData.Title} onChange={(e) => { setPostData({ ...postData, Title: e.target.value }) }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="Title"><h5>Image</h5></label>
                                <input className="form-control" type="file" id="formFile" accept="image/*" onChange={ItemImageOnChangeHandeler} />
                                {file != '' && (
                                    <div className='mt-5'>
                                        <img className='mx-5' src={URL.createObjectURL(file)} alt={file.name} style={{ width: '55vw', hight: '40vw' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="TextContent"><h5>Plants Dicription</h5></label>
                                <textarea type="text" className="form-control" id="Title" placeholder="Enter Discription" value={postData.TextContent} onChange={(e) => { setPostData({ ...postData, TextContent: e.target.value }) }} style={{ height: '20vh' }} />
                            </div>
                            <div className="mb-3">
                                <div className='row'>
                                    {FieldTableGenerator(postData.Fields)}
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.Activity} onClick={(e) => { setPostData({ ...postData, Activity: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">Add Listing to Catalog.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="shareAck" name="shareAck" checked={postData.publicAck} onClick={(e) => { setPostData({ ...postData, publicAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="information">I acknowledge that my information will be shared with others.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="saveAck" name="saveAck" checked={postData.saveAck} onClick={(e) => { setPostData({ ...postData, saveAck: e.target.checked }) }} />
                            <label className="custom-control-label" htmlFor="save-info">I acknowledge that my information will be saved online</label>
                        </div>
                        <hr className="mb-4" />
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-lg btn-block" style={{ marginLeft: '25vw' }} onClick={(e) => { addPostOnClickHendeler(e) }} >Add Post</button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/" className="link-danger"><button className="btn btn-primary btn-lg btn-block" >Close</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    function switches() {
        switch (ContentType) {
            case '0':
                return TextPost()

            case '1':
                return ImagePost()

            case '2':
                return VideoPost()

            case '3':
                return NurseryListing()

            default:
                break;
        }
    }
    return (
        <div className="bg-light">
            <div className="container">
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4" src="../assets/Logo/PlantLogo.png" alt="" width="72" height="72" />
                    <h2>Create New Post</h2>
                    <p className="lead">Add details of the post</p>
                </div>
                <div>
                    <div className='row'>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => handleChange("0")} checked={ContentType === "0"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Text Content
                            </label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => handleChange("1")} checked={ContentType === "1"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Image Content
                            </label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => handleChange("2")} checked={ContentType === "2"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                Video Content
                            </label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={() => handleChange("3")} checked={ContentType === "3"} />
                            <label className="form-check-label" htmlFor="flexRadioDefault4">
                                Nursery Listing
                            </label>
                        </div>
                    </div>
                </div>
                {switches()}
            </div>
        </div>
    )
}

export default AddNewPost
