import React from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'

const nevbarUser = ({title,userProps,logOut}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark my-nav"
      style={{ padding: '0px' }}
    >
      <div className="container-fluid" style={{ padding: '0px' ,backgroundColor:"Green" ,position:"fixed"}}>
        <a className="navbar-brand mx-3" href="#">
          {title}{' '}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className='mx-3'>
              <Link className="nav-link active" aria-current="page" to="/">
                Feeds
              </Link>
              </div>
              <div className='mx-3'>
              <Link className="nav-link active" aria-current="page" to="/">
                Profile
              </Link>
              </div>
              <div className='mx-3'>
              <Link className="nav-link active" aria-current="page" to="/">
                MyActivites
              </Link>
              </div>
          <div className='col-md-2'>
          <input type="text" className="form-control" style={{paddingLeft:"10px",backgroundColor:"white" ,marginTop:'17px',borderTopLeftRadius:'15px',borderBottomLeftRadius:'15px'}} />
          </div>
          <div className='col-md-1'>
          <select className="custom-select d-block"  style={{backgroundColor:"white" ,marginTop:'8px',borderTopRightRadius:'15px',borderBottomRightRadius:'15px'}}>
                <option value="People">People</option>
                <option value="Post">Post</option>
                <option value="Plant">Plant</option>
                </select>
          </div>
          <div className='col-md-1'>
          <button className="btn btn-primary btn-lg btn-block" style={{marginTop:'10px',marginLeft:"8px"}} >Search</button>
          </div>
          <div className='mx-5'>
          <Link className="nav-link active" aria-current="page" to="/">
          <button className="btn btn-primary btn-lg btn-block" style={{marginTop:'10px',marginLeft:"8px"}} >Add a new post</button>
              </Link>
              </div>
          <Popup
            trigger={
              <div className="col-md-3" >
                <h5 className="nav-user-item" >
                  Current User : {userProps.user.Name}
                </h5>
              </div>
            }
            position="bottom"
          >
            
              <button
                type="button"
                className="btn btn-success col-md-12"
                onClick={() => {
                  logOut()
                }}
              >
                SignOut
              </button>
            
          </Popup>
        </div>
      </div>
    </nav>
  )
}

function Nevbar(props) {
  return nevbarUser(props)
}

export default Nevbar
