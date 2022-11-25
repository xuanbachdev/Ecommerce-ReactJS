import styles from "./StoreInfor.module.scss"
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";
import HomeStore from "~/components/HomeStore/homeStore";
import { useEffect } from "react";



const cx = classNames.bind(styles)
function Store() {

    useEffect(() => {
        window.scroll(0,0)
    },[])
    return (
        <div className={cx("body")}>
            <div className={cx("labelAddress")}>
                Địa chỉ cửa hàng
            </div>
            <div className={cx("time")}>
                <span><FontAwesomeIcon icon={faCalendarDays} /></span>
                <span>Đăng ngày 10/11/2020</span>
            </div>
            <div className={cx("makeOrder")}>
                <p>Đặt hàng Online tại Facebook của shop:</p>
                <span><FontAwesomeIcon icon={faHandPointer} /></span>
                <a href="https://www.facebook.com/phukienonion">https://www.facebook.com/phukienonion</a>
            </div>
            <div className={cx("address")}>
                <div>Địa chỉ cửa hàng Offline:</div>
                <div>
                    <p>TP.Hồ Chí Minh:</p>
                    <div>
                        <span><FontAwesomeIcon icon={faCircleDot} /></span>
                        <span>61 Nguyễn Phi Khanh, P.Tân Định, Quận 1</span>
                    </div>
                </div>
                <div>
                    <p>Hà Nội:</p>
                    <div>
                        <span><FontAwesomeIcon icon={faCircleDot} /></span>
                        <span>265 Trần Đăng Ninh, Cầu Giấy</span>
                    </div>
                    <div>
                        <span><FontAwesomeIcon icon={faCircleDot} /></span>
                        <span>Số 7A ngõ 76 Nguyễn Chí Thanh</span>
                    </div>
                    <div className={cx("MHD")}>
                        <span><FontAwesomeIcon icon={faCircleDot} /></span>
                        <span>130A Mai Hắc Đế</span>
                    </div>
                    <div className={cx("THT")}>
                        <span><FontAwesomeIcon icon={faCircleDot} /></span>
                        <span>81A Trần Hữu Tước (số 55-57 Nguyễn Lương Bằng rẽ vào 200m)</span>
                    </div>
                </div>
            </div>
            <div className={cx("btn")}>
                <button>Thích</button>
                <button>Chia sẻ</button>
            </div>
            <HomeStore/>
        </div>
    );
}

export default Store