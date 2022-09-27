import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import md5 from 'md5'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";

function Register({setUserProps}) {
    let RegisterData = {
        Name: '',
        Pasword: '',
        Email: ''
    }
    const navigate = useNavigate();

    const [NameInput, setName] = useState('Enter first name')
    const [EmailInput, setEmail] = useState('Enter Your Email')
    const [PaswordInput, setPasword] = useState('Pasword')
    const [ReenterPaswordInput, setReenterPasword] = useState('')
    const [Match, setMatch] = useState('Mismatch')
    const [color, setcolor] = useState('red')

    const onChangehandleName = (event) => {
        setName(event.target.value)
    }
    const onChangehandleEmail = (event) => {
        setEmail(event.target.value)
    }
    const onChangehandlePasword = (event) => {
        setPasword(event.target.value)
    }
    const onChangehandleReenterPasword = (event) => {
        setReenterPasword(event.target.value)
        if (event.target.value == PaswordInput) {
            setMatch('Matched')
            setcolor('blue')
        } else {
            setMatch('Mismatch')
            setcolor('red')
        }
    }

    const onClickRegisterHandle = async (e) => {
        RegisterData.Name = NameInput
        RegisterData.Email = EmailInput
        RegisterData.Pasword = md5(PaswordInput)
        let responseData = await axios.post(`http://localhost:5000/api/auth/CreateUser`, RegisterData,).catch((err) => console.log(err))
        setUserProps(responseData.data)
        navigate('/');
    }

    const onClickInputNameHandle = () => {
        setName('')
    }
    const onClickInputEmailHandle = () => {
        setEmail('')
    }
    const onClickInputPaswordHandle = () => {
        setPasword('')
    }
    const onClickInputReenterPaswordHandle = () => {}

    return (
        <div>
            <section className="vh-100"
                style={
                    {backgroungColor: '#eee'}
            }>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black"
                                style={
                                    {borderRadius: '25px'}
                            }>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign up
                                            </p>

                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control"
                                                            value={NameInput}
                                                            onChange={onChangehandleName}
                                                            onClick={onClickInputNameHandle}/>
                                                        <label className="form-label" htmlFor="form3Example1c">
                                                            Your Name
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control"
                                                            value={EmailInput}
                                                            onChange={onChangehandleEmail}
                                                            onClick={onClickInputEmailHandle}/>
                                                        <label className="form-label" htmlFor="form3Example3c">
                                                            Your Email
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control"
                                                            value={PaswordInput}
                                                            onChange={onChangehandlePasword}
                                                            onClick={onClickInputPaswordHandle}/>
                                                        <label className="form-label" htmlFor="form3Example4c">
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" className="form-control"
                                                            value={ReenterPaswordInput}
                                                            onChange={onChangehandleReenterPasword}
                                                            onClick={onClickInputReenterPaswordHandle}/>
                                                        <label className="form-label" htmlFor="form3Example4cd">
                                                            Repeat your password
                                                        </label>
                                                        <br/>
                                                        <label className="form-label" htmlFor="form3Example4cd">
                                                            password
                                                        </label>
                                                        <label className="form-label mx-2" htmlFor="form3Example4cd"
                                                            style={
                                                                {color: color}
                                                        }>
                                                            {Match} </label>
                                                    </div>
                                                </div>

                                                <div className="text-center text-lg-start mt-4 pt-2">
                                                        <Link to="/"><button type="button" className="btn btn-primary btn-lg"
                                                            style={
                                                                {
                                                                    paddingLeft: '2.5rem',
                                                                    paddingRight: '2.5rem'
                                                                }
                                                            }
                                                            onClick={onClickRegisterHandle}>
                                                            Register
                                                        </button></Link>
                                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                                        Already have an account?
                                                        <Link to="/" className="link-danger">
                                                            Login
                                                        </Link>
                                                    </p>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Register
