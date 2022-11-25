/* eslint-disable no-useless-escape */

import React, {  useState } from 'react'
import classnames from 'classnames/bind';
import styles from './login.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const cx=classnames.bind(styles)

function Login() {

    const [booleanUser ] = useState(false)
    const [booleanPass , setBooleanPass] = useState(false)
    const [booleanEmail , setBooleanEmail] = useState(false)
    const [booleanConfirmPass , setBooleanConfirmPass] = useState(false)

    const [count , setCount] = useState(0)
    const [inpUserName , setInpUserName] = useState('')
    const [inpPass , setInpPass] = useState('')
    const [inpEmail , setInpEmail] = useState('')
    const [inpConfirmPass , setInpConfirmPass] = useState('')
    const next = useNavigate()



    const isPassWord = document.getElementById("passWord")
    const isEmail = document.getElementById("email")
    const isConfirmPass = document.getElementById("confirmPass")

    
    const Email= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const Password= /^[a-zA-Z0-9\(+=._-]{6,}$/


    function toSignUp(){
        setCount(count+1)
    }
    function toLogIn(){
        setCount(count+1)
    }

    function checkInpEmail(){
        if (!Email.test(inpEmail) && inpEmail !=="") {
            setBooleanEmail(true)
        } else {
            setBooleanEmail(false)
            isEmail.removeAttribute("style" , "border-bottom : 1px solid #333")
        }
    }


    function checkInpPass(){
        if (!Password.test(inpPass) && inpPass !=="") {
            setBooleanPass(true)
        }else{
            setBooleanPass(false)
            isPassWord.removeAttribute("style" , "border-bottom : 1px solid #333")
        }
    }



    function checkInpComfirmPass(){
        if ( inpPass === inpConfirmPass) {
            setBooleanConfirmPass(false)
        }else{
            setBooleanConfirmPass(true)
        }
    }

    const forLogin = (e)=>{
        e.preventDefault()
        axios.post(`/auth/sign-in` , {
            'email' : inpEmail,
            'password' : inpPass
        })
        .then(res =>{     
            localStorage.setItem("Token",res.data.token)
            localStorage.setItem("email",inpEmail.slice(0 ,inpEmail.indexOf("@")))
            next("/")
            alert('ĐĂNG NHẬP THÀNH CÔNG')
        })
        .catch(err=>{
            alert('TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG CHÍNH XÁC')
        })

    }



    const forSignUp =(e) =>{

        e.preventDefault()
        if (inpConfirmPass === inpPass  && Email.test(inpEmail) && Password.test(inpPass)) {
            axios.post(`/auth/sign-up` , {
                'username' : inpUserName,
                'email' : inpEmail,
                'password' : inpPass
            })
            .then(res =>{
                setCount(count+1)
                localStorage.setItem("name",inpUserName)
                alert('ĐĂNG KÍ THÀNH CÔNG');
            })
            .catch(er =>{
                alert("ĐĂNG KÍ THẤT BẠI")
            })
        }else{
            alert("ĐĂNG KÍ THẤT BẠI")
        }

        setTimeout(() => {
            if(inpPass === "" || !Password.test(inpPass)){
                isPassWord.focus()
                isPassWord.setAttribute("style" , "border-bottom : 3px solid red")
                setBooleanPass(true)
                
            }else if(inpConfirmPass ==="" || inpConfirmPass !== inpPass){
                isConfirmPass.focus()
                isConfirmPass.setAttribute("style" , "border-bottom : 3px solid red")
                setBooleanConfirmPass(false)
            }
        }, 500);
        
        setTimeout(() => {
             if(inpEmail === "" || !Email.test(inpEmail)){
                isEmail.focus()
                isEmail.setAttribute("style" , "border-bottom : 3px solid red")
                setBooleanEmail(true)
            }
        }, 500);

 
    }

    return ( 
        <>
        <div className={cx('login')}>
            <form 
                onSubmit={forLogin}
                style={{display:(count%2===0) ? "none" : "block"}} 
                className={cx('form-login')}
            >
                <h1>Login</h1>
                <input
                    className={cx('inp-login')} 
                    value={inpEmail} 
                    onChange={(e)=>setInpEmail(e.target.value)} 
                    onBlur={checkInpEmail} type="text" 
                    placeholder='Email'
                />    
                <br />
                <p className={cx((booleanEmail)?'err-msg' : 'hidden')}>
                    *sai định dạng !!
                </p>
                <input 
                    className={cx('inp-login')}    
                    value={inpPass} 
                    onChange={(e)=>setInpPass(e.target.value)} 
                    onBlur={checkInpPass} 
                    type="password" 
                    placeholder='Password'/> <br /> 
                <p className={cx((booleanPass)?'err-msg' : 'hidden')}>
                    *Password phải từ 6 kí tự vào không có kí tự đặc biệt !!
                </p>
                <div style={{textAlign:'right' , marginRight:"50px"}}>
                    <input className={cx("saveUser")} type="checkbox"/> Renember me
                    <p>For got your password?</p>

                </div>

                <button className={cx('bnt-login')} >Login</button>
                <h2>
                    or <span className={cx('change')} onClick={toSignUp}>
                            SignUp
                       </span>
                </h2>
            </form>

            <form 
                onSubmit={forSignUp}
                style={{display:(count%2===1) ? "none" : "block"}} 
                className={cx('form-signup')}
            >
                <h1>SignUp</h1>
                <input 
                    className={cx('inp-SignUp')} 
                    id="userName"
                    value={inpUserName} 
                    onChange={(e)=>setInpUserName(e.target.value)} 
                    // onBlur={checkInpUser} 
                    type="text" 
                    placeholder='Username'
                /> 
                <br />
                <p className={cx((booleanUser)?'err-msg' : 'hidden')}>
                    *sai định dạng !!
                </p>
                <input 
                    className={cx('inp-SignUp')} 
                    id="email"
                    value={inpEmail} 
                    onChange={(e)=>setInpEmail(e.target.value)} 
                    onBlur={checkInpEmail} 
                    type="email" 
                    placeholder='Email'
                /> 
                <br />
                <p className={cx((booleanEmail)?'err-msg' : 'hidden')}>
                    *sai định dạng !!
                </p>
                <input 
                    className={cx('inp-SignUp')} 
                    id="passWord"
                    value={inpPass} 
                    onChange={(e)=>setInpPass(e.target.value)} 
                    onBlur={checkInpPass} 
                    type="password" 
                    placeholder='Password'/> <br />
                <p className={cx((booleanPass)?'err-msg' : 'hidden')}>
                    *Password từ 6 kí tự
                </p>
                <input 
                    className={cx('inp-SignUp')}
                    id="confirmPass" 
                    value={inpConfirmPass}  
                    onChange={(e)=>setInpConfirmPass(e.target.value)} 
                    onBlur={checkInpComfirmPass} 
                    type="password" 
                    placeholder='Confirm password'
                /> 
                <br />
                <p className={cx((booleanConfirmPass)?'err-msg' : 'hidden')}>
                    *mật khẩu không khớp
                </p>
                <button className={cx('bnt-signup')}>
                    SignUp
                </button>
                <h2>or <span className={cx('change')} onClick={toLogIn}>LogIn</span></h2>
            </form>
        </div>
        </>
     );
}

export default Login;