import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import classNames from "classnames/bind"

import styles from "./nav.module.scss"
import axios from "~/axios"

const cx = classNames.bind(styles)
function Nav({onClose}) {
    const [data,setData] = useState([])
    useEffect(() => {
        axios.get('/category/get-all-categories')
        .then (res => {
            const categorieArray = res.data.categories
            const categories = categorieArray.map(item =>{
            return item.categoryName
          })
          setData(categories)
        }) 
      },[])
    return ( 
        <ul className={cx('nav')}>
            {data.map(category => {
              return (
                <li onClick={onClose} key={category}><NavLink className={({ isActive }) => isActive ? cx("active"): ''} to={`/category/${category}`}>{category}</NavLink></li>
              )
            })}
         </ul>
     );
}

export default Nav;