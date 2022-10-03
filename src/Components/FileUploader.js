import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function FileUploader({setNewImage,Email}) {
  const [file, setFile] = useState('')

  const ItemImageOnChangeHandeler = (event) => {
    setFile(event.target.files[0])
  }

  async function updateImage(){
    const formData = new FormData()
    formData.append('Email',Email)
    formData.append('file', file)
    let newimage=await axios.post('http://localhost:5000/api/bioData/AddPhoto', formData)
    setNewImage(newimage)
  }


  return (
    <div>
      <label htmlFor="formFile" className="form-label">Upload Image</label>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Select the image to be uploaded</label>
        <input className="form-control" type="file" id="formFile" accept="image/*" onChange={ItemImageOnChangeHandeler}/>
      </div>
      {file!='' && (
        <>
        <div>
          <img className='mx-5' src={URL.createObjectURL(file)} alt={file.name} style={{width:'30vw',hight:'30vw'}}/>
        </div>
        <button className="btn btn-primary btn-lg btn-block mt-1" style={{ marginLeft: '17vw' }} onClick={updateImage} >Save</button>
        </>
      )}
    </div>
  )
}

export default FileUploader
