import classNames from "classnames/bind";
import styles from '~/pages/Profile/profile.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import  {FavouriteProduct}  from '~/pages/Profile/favourite_product';
import { useEffect } from 'react';

function Profile() {
    const cx = classNames.bind(styles)
    const nav = useNavigate()
    function update_info(){
        nav('/profile/update-info')
    }
    let dataUser = JSON.parse(localStorage.getItem('User'))
    useEffect(() =>{
        window.scroll(0,0)
    },[])
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('text-user')}>Tài khoản của {dataUser.username}</h3>
            <div className={cx('container')}>
               <div className={cx('content')}>
                <div className={cx('detail')}>
                        <p className={cx('title', ['text-center'])}>Thông tin tài khoản</p>
                        <div className={cx('info')}>
                            <ul className={styles.list_menu}>
                                <li>Điểm tích luỹ của bạn: 1000 <sub>đ</sub> </li>
                                <li>Cấp độ khách hàng: 1</li>
                                <li onClick={update_info}>Thay đổi thông tin cá nhân</li>
                                <Link to={'change-pass'}><li>Thay đổi mật khẩu</li></Link>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('favorite_product')}>
                        <p className={cx('title', ['text-center'])}>Sản phẩm yêu thích</p>
                            <FavouriteProduct/>
                    </div>
               </div>
            </div>
        </div>
     );
}

export default Profile;
