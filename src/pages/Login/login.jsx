/* eslint-disable no-useless-escape */

import React, { useRef, useState, useEffect } from 'react'
import classnames from 'classnames/bind';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUserInfo, loginCart, userLogin } from '~/redux/reducer/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { postAPI } from '~/config/api';

const cx = classnames.bind(styles)

function Login() {
    const [count, setCount] = useState(true)
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const nav = useNavigate()

    const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    const dispatch = useDispatch()

    const [errMess, setErrMess ] = useState('')
    const msg = {}
    useEffect(() =>{
        window.scroll(0,0)
    },[])

    const validateUsername = () =>{
        if(username.current.value.trim() === ''){
            msg.username = 'Vui lòng nhập username'
        }
        else if(username.current.value.length < 6){
            msg.username = 'Username tối thiểu 6 ký tự'
        }
        setErrMess(msg)
    }

    const validateEmail = () =>{
        if(email.current.value.trim() === ''){
            msg.email = 'Vui lòng nhập email'
        }
        else if(!regexEmail.test(email.current.value)){
            msg.email = 'Email không hợp lệ'
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

    const validateEmailSignUp = () =>{
        if(inputEmail.current.value.trim() === ''){
            msg.inputEmail = 'Vui lòng nhập email'
        }
        else if(!regexEmail.test(inputEmail.current.value)){
            msg.inputEmail = 'Email không hợp lệ'
        }
        setErrMess(msg)
    }

    const validatePassSignUp = () =>{
        if(inputPassword.current.value.trim() === ''){
            msg.inputPassword = 'Vui lòng nhập mật khẩu'
        }
        else if(inputPassword.current.value.length < 6){
            msg.inputPassword = 'Mật khẩu tối thiểu 6 ký tự'
        }
        setErrMess(msg)
    }
    const validateConfirmPass = () =>{
        if(confirmPassword.current.value.trim() === ''){
            msg.confirmPassword = 'Vui lòng nhập lại mật khẩu'
        }
        else if(confirmPassword.current.value.length < 6){
            msg.confirmPassword = 'Mật khẩu tối thiểu 6 ký tự'
        }
        else if(confirmPassword.current.value !== inputPassword.current.value){
            msg.confirmPassword = 'Mật khẩu không trùng khớp ^^ Vui lòng nhập lại'
        }
        setErrMess(msg)
    }
    const validateAll = () =>{
        validateEmail()
        validatePass()
       if(Object.keys(msg).length > 0) return false
       return true
    }

    const validateSignUp = () => {
        validateUsername()
        validateEmailSignUp()
        validatePassSignUp()
        validateConfirmPass()
        if(Object.keys(msg).length > 0) return false
        return true
    }

    const handleSignIn = async (e) => {
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
            dispatch(loginCart())
            localStorage.setItem('email', email.current.value)
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        const isValid = validateSignUp()
        const data = {
            username: username.current.value,
            email: inputEmail.current.value,
            password: inputPassword.current.value
        }
        if(!isValid) return
        try{
          await postAPI('/auth/sign-up', data)
          setCount(true)
            alert('Đăng ký thành công! Bạn sẽ được chuyển về trang đăng nhập ngay bây giờ')

        }
        catch(err){
            if(err.response.data.message === 'email is in used'){
                toast.error('Email đã được sử dụng, vui lòng nhập email khác')
            }
            else{
                toast.error('Đăng ký thất bại ^^');
            }
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
                    <div className={cx('remember')}>
                        <input className={cx("saveUser")} type="checkbox" /> Remember me
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
                    onSubmit={handleSignUp}
                    style={{ display: (!count) ? "block" : "none" }}
                    className={cx('form-signup')}
                >
                    <h1>SignUp</h1>
                    <input
                        className={cx('inp-SignUp')}
                        ref={username}
                        id="userName"
                        type="text"
                        placeholder='Vui lòng nhập Username'
                        onInput={validateUsername}
                    />
                    <br />
                    <p className={styles.warning} id='errorUsername'>{errMess.username}</p>
                    <input
                        className={cx('inp-SignUp')}
                        ref={inputEmail}
                        id="emailSignUp"
                        type="text"
                        placeholder='Vui lòng nhập Email'
                        onInput={validateEmailSignUp}
                    />
                    <br />
                    <p className={styles.warning} id='errorEmail'>{errMess.inputEmail}</p>
                    <input
                        className={cx('inp-SignUp')}
                        ref={inputPassword}
                        id="passWordSignUp"
                        type="password"
                        placeholder='Vui lòng nhập mật khẩu'
                        onInput={validatePassSignUp}
                        /> <br />
                         <p className={styles.warning} id='errorPass'>{errMess.inputPassword}</p>
                    <input
                        className={cx('inp-SignUp')}
                        ref={confirmPassword}
                        id="confirmPass"
                        type="password"
                        placeholder='Vui lòng nhập lại mật khẩu'
                        onInput={validateConfirmPass}
                    />
                    <br />
                    <p className={styles.warning} id='signUp'>{errMess.confirmPassword}</p>
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