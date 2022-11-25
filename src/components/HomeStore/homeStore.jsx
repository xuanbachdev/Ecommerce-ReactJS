import styles from './homeStore.module.scss'
import classNames from 'classnames/bind';

import image from '~/assets/images/homeStort.png' 
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)
function HomeStore() {
    return ( 
        <div className={cx('home-store')}>
            <img src={image} className={cx('home')} alt="" />
            <div className={cx('text-store')}>
               <Link to="/storeInfor" target="_self">Xem danh sách cửa hàng</Link>
            </div>
         </div>
     );
}

export default HomeStore;