import styles from '~/page/Profile/profile.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { patchAPI } from '../../config/api';
import { useRef } from 'react';

export const ChangePassword = () => {

  const nav = useNavigate()
  const oldPass = useRef(null)
  const newPass = useRef(null)
  const confirmPass = useRef(null)

  const handleUpdate = async () =>{
    try{
      if(!oldPass.current.value){
        toast.error('Mật khẩu cũ không được để trống')
      }
      else if(!newPass.current.value){
        toast.error('Mật khẩu mới không được để trống')
      }
      else if(!confirmPass.current.value){
        toast.error('Vui lòng nhập lại mật khẩu')
      }
      else if(confirmPass.current.value !== newPass.current.value){
        toast.error('Mật khẩu mới không trùng khớp')
      }
     else{
        await patchAPI('/user/change-password', {
          oldPass: oldPass.current.value,
          newPass: newPass.current.value
        })
        window.localStorage.removeItem('Token')
        window.localStorage.removeItem('email')
        toast.success('Đổi mật khẩu thành công ! Bạn sẽ được chuyển đến trang đăng nhập ngay bây giờ !')
        setTimeout(() => {
        nav('/login')
        }, 3000)
     }
    }catch(err){
      toast.error('Đổi mật khẩu thất bại !')
    }
  }
  return (
    <div className={styles.wrapper}>
			<div className={styles.container}>
				<h1 className='text-center'>Thay đổi mật khẩu</h1>
				<form id={styles.formAcc}>
            <div className={styles.formcontrol}>
              <label htmlFor=''>Mật khẩu cũ:</label>
              <input
                name='oldPass'
                ref={oldPass}
                id='oldPass'
                type='password'
                placeholder='Vui lòng nhập mật khẩu cũ'
              />
            </div>
            <div className={styles.formcontrol}>
                <label htmlFor=''>Mật khẩu mới:</label>
                <input
                  type='password'
                  id='newPass'
                  ref={newPass}
                  placeholder='Vui lòng nhập mật khẩu mới'
                />
            </div>
            <div className={styles.formcontrol}>
              <label htmlFor=''>Nhập lại mật khẩu mới:</label>
              <input
                type='password'
                id='confirmPass'
                ref={confirmPass}
                placeholder='Vui lòng nhập lại mật khẩu mới'
              />
            </div>
            <div className={styles.formcontrol}>
              <button type='button' className={styles.btn} onClick={handleUpdate}>Cập nhập mật khẩu</button>
              <Link to={'/profile'}> <button type='button' className={styles.btn}>Back</button></Link>
            </div>
            <Link to={'/profile'}></Link>
              <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
              <ToastContainer />
				</form>
			</div>
		</div>
  )
}
