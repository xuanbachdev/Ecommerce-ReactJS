import { NavLink } from "react-router-dom";
import styles from "./home.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function IconCategory({data}) {
    
    return ( 
        <li className={cx("body")}>
            <NavLink className={({ isActive }) => isActive ? cx("active"): ''}  to={`/category/${data.categoryName}`}>
                <img src={"https://shope-b3.thaihm.site/" + data.thumbnail} alt="" />
            </NavLink>
            <p>{data.categoryName}</p>
        </li>
     );
}

export default IconCategory;