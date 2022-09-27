import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import md5 from 'md5'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function LoginScreen({setUserProps,userProps}) {
    let loginData = {
        Email: '',
        Pasword: ''
    }

    const [EmailInput, setEmail] = useState('Enter Your Email')
    const [PaswordInput, setPasword] = useState('Pasword')

    const onChangehandleEmail = (event) => {
        setEmail(event.target.value)
    }
    const onChangehandlePasword = (event) => {
        setPasword(event.target.value)
    }
    const onClickLoginHandle = async (e) => {
        e.preventDefault();
        loginData.Email = EmailInput
        loginData.Pasword = md5(PaswordInput)
        let responseData = await axios.post('http://localhost:5000/api/auth/Login', loginData).catch((err) => console.log(err))
        setEmail('')
        setPasword('')
        setUserProps(responseData.data)
    }

    const onClickInputEmailHandle = () => {
        setEmail('')
    }
    const onClickInputPaswordHandle = () => {
        setPasword('')
    }

    return (
        <div className="Login">
            <section className="vh-100">
                <div className="container-fluid h-custom Login ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form> {' '}
                                {/*Email input*/}
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        value={EmailInput}
                                        onChange={onChangehandleEmail}
                                        onClick={onClickInputEmailHandle}/>
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                </div>
                                {/*Password input*/}
                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        value={PaswordInput}
                                        onChange={onChangehandlePasword}
                                        onClick={onClickInputPaswordHandle}/>
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg"
                                            style={
                                                {
                                                    paddingLeft: '2.5rem',
                                                    paddingRight: '2.5rem'
                                                }
                                            }
                                            onClick={onClickLoginHandle}>
                                            Login
                                        </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/Links/Register" className="link-danger">
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



export default LoginScreen
