import classNames from "classnames/bind";
import styles from "./productResult.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function ProductResult({data,onClick}) {
    return ( 
        <div className={cx("wrapper")} onClick={() => onClick(false)}>
            <Link className={cx('sub-wrap')} to={`/product/${data._id}`}>
                <img className={cx("avatar")} src={ "https://shope-b3.thaihm.site/" + data.thumbnail} alt="" />
                <div className={cx("info")}>
                    <p className={cx("name")}>{data.productName}</p>
                    <span className={cx("price")}>{data.price?.toLocaleString('en-US', {style:'currency',currency:'VND'})}</span>
                </div>
           </Link>
        </div>
     );
}

export default ProductResult;