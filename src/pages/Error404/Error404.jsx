import HomeStore from "~/components/HomeStore/homeStore";
import classnames from 'classnames/bind';
import styles from './Error404.module.scss';
import { useNavigate } from "react-router-dom";
import SlideShow from '~/components/SlideShow/slideauto'


const cx =classnames.bind(styles)



function Error404() {
    const next =useNavigate()
    function isBack() {
        next("/")
    }
    return ( 
        <>
        <SlideShow />
        <div className ={cx("slide_404Err")}>
            <h1 className={cx("Error-notification")}>Không Tìm Thấy Sản phẩm</h1>
            <button onClick={isBack}>Come back home</button>
        </div>
        <HomeStore/>
        </>
     );
}

export default Error404;