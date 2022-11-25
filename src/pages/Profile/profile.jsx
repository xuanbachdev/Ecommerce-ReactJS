import classNames from "classnames/bind";
import styles from '~/page/Profile/profile.module.scss'
import { Link } from 'react-router-dom';
import  {FavouriteProduct}  from '~/page/Profile/favourite_product';

function Profile() {
    const cx = classNames.bind(styles)
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('text-user')}>Tài khoản của {localStorage.getItem('email')}</h3>
            <div className={cx('container')}>
               <div className={cx('content')}>
                <div className={cx('detail')}>
                        <p className={cx('title', ['text-center'])}>Thông tin tài khoản</p>
                        <div className={cx('info')}>
                            <p>Điểm tích luỹ của bạn: 1000 <sub>đ</sub> </p>
                            <p>Cấp độ khách hàng: 1</p>
                            <Link to={'update-info'}><p>Thay đổi thông tin cá nhân</p></Link>
                            <Link to={'change-pass'}><p>Thay đổi mật khẩu</p></Link>
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
