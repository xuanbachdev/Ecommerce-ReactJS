/* eslint-disable no-useless-escape */

import React, { useRef, useState, useEffect } from 'react'
import classnames from 'classnames/bind';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import {ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUserInfo, userLogin } from '~/redux/reducer/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const cx = classnames.bind(styles)

function Login() {
    const [booleanUser] = useState(false)
    const [count, setCount] = useState(true)
    const [inpUserName, setInpUserName] = useState('')
    const email = useRef()
    const password = useRef()
    const nav = useNavigate()

    const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    const dispatch = useDispatch()

    const [errMess, setErrMess ] = useState('')
    const msg = {}
    useEffect(() =>{
        window.scroll(0,0)
    },[])

    const validateEmail = () =>{
        if(email.current.value.trim() === ''){
            msg.email = 'Vui lòng nhập email'
        }
        else if(!regexEmail.test(email.current.value)){
            msg.email = 'Email không đúng định dạng'
        }
        setErrMess(msg)
    }

    const validatePass = () =>{
        if(password.current.value.trim() === ''){
            msg.password = 'Vui lòng nhập mật khẩu'
        }
        else if(password.current.value.length < 6){
            msg.password = 'Mật khẩu tối thiểu 6 ký tự'
        }
        setErrMess(msg)

    }

    const validateAll = () =>{
       validateEmail()
       validatePass()
       if(Object.keys(msg).length > 0) return false
       return true
    }

    const handleSignIn = async(e) =>{
        e.preventDefault()
       const isValid = validateAll()
       if(!isValid) return
       const params = {
        email: email.current.value,
        password: password.current.value
       }

        const response = await dispatch(userLogin(params))
        const token = unwrapResult(response)
        if(token){
            nav('/')
            dispatch(getUserInfo())
        }
    }

    return (
        <>
            <div className={cx('login')}>
                <form
                    style={{ display: (count) ? "block" : "none" }}
                    className={cx('form-login')}
                    onSubmit={handleSignIn}
                >
                    <h1>Login</h1>
                    <input
                        id='email'
                        className={cx('inp-login')}
                        placeholder='Vui lòng nhập email'
                        onInput={validateEmail}
                        ref={email}
                    />
                    <br />
                    <p className={styles.warning} id='errorEmail'>{errMess.email}</p>
                    <input
                        id='password'
                        className={cx('inp-login')}
                        type="password"
                        placeholder='Vui lòng nhập password'
                        onInput={validatePass}
                        ref={password}
                        />
                        <br />
                    <p className={styles.warning} id='msg'>{errMess.password}</p>
                    <div style={{ textAlign: 'right', marginRight: "50px" }}>
                        <input className={cx("saveUser")} type="checkbox" /> Renember me
                        <p>For got your password?</p>

                    </div>

                    <button className={cx('bnt-login')} >Login</button>
                    <h2>
                        or <span className={cx('change')} onClick={() => setCount(false)}>
                            SignUp
                        </span>
                    </h2>
                </form>

                <form
                    style={{ display: (!count) ? "block" : "none" }}
                    className={cx('form-signup')}
                >
                    <h1>SignUp</h1>
                    <input
                        className={cx('inp-SignUp')}
                        id="userName"
                        value={inpUserName}
                        onChange={(e) => setInpUserName(e.target.value)}
                        // onBlur={checkInpUser}
                        type="text"
                        placeholder='Username'
                    />
                    <br />
                    <p className={cx((booleanUser) ? 'err-msg' : 'hidden')}>
                        *sai định dạng !!
                    </p>
                    <input
                        className={cx('inp-SignUp')}
                        id="email"
                        type="text"
                        placeholder='Email'
                    />
                    <br />
                    <input
                        className={cx('inp-SignUp')}
                        id="passWord"
                        type="password"
                        placeholder='Password' /> <br />
                    <input
                        className={cx('inp-SignUp')}
                        id="confirmPass"
                        type="password"
                        placeholder='Confirm password'
                    />
                    <br />
                    <button className={cx('bnt-signup')}>
                        SignUp
                    </button>
                    <h2>or <span className={cx('change')} onClick={() => setCount(true)}>LogIn</span></h2>
                </form>
            </div>
                <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </>
    );
}

export default Login;