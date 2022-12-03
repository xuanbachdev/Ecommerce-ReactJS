import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { addProduct, deleteProduct } from "~/reducer/favourite";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";


import styles from "./product.module.scss"
import { useState } from "react";
const cx = classNames.bind(styles)

function Product({data,index}) {

    const dispatch=useDispatch()

  const [,setCheck] = useState(()=>{
    return JSON.parse(localStorage.getItem('check')) ??  []
    })

   const likeProduct = () => {
    const action = addProduct(data)
    dispatch(action)
    setCheck(() => {
        let oldStore = JSON.parse(localStorage.getItem('check')) ?? []
        const arr = [...oldStore,index]
        localStorage.setItem('check',JSON.stringify(arr))
        return arr
    })
  }
  const removePro = () => {
    const action = deleteProduct(data)
    dispatch(action)
    setCheck(() => {
        let oldStore = JSON.parse(localStorage.getItem('check')) ?? []
        const arr = [...oldStore]
        const i = arr.indexOf(index)
        arr.splice(i,1)
        localStorage.setItem('check',JSON.stringify(arr))
        return arr
    })


  }

    return (
        <div className={cx("wrapper")}>
            <div>
                <Link to={`/product/${data._id}`}>
                    <LazyLoadImage
                        effect="blur"
                        className={cx("image")}
                        src={"https://shope-b3.thaihm.site/" + data.thumbnail}
                        alt={data._id}
                    />
                </Link>
            </div>
            <div className={cx("info")}>
                <p className={cx("name")}>{data.productName}</p>
                <p className={cx("price")}>
                    {data.price ? data.price.toLocaleString('en-US', {style:'currency',currency:'VND'})
                    :Number(20000000).toLocaleString('en-US', {style:'currency',currency:'VND'})}
                </p>
            </div>
            <div className={cx('action')}>
                <p>
                    <Link to ={`/product/${data._id}`}>
                        <FontAwesomeIcon className={cx("icon-action")} icon={faEye}/>Xem
                    </Link>
                </p>
                { !(JSON.parse(localStorage.getItem('check')) ?? []).includes(index ) ?
                    <p className={cx("link-product")} onClick={likeProduct}>
                        <FontAwesomeIcon className={cx("icon-action")} icon={faHeart}/>like
                    </p>
                    :
                    <p className={cx("link-product")} onClick={removePro}>
                        <FontAwesomeIcon className={cx("icon-action")} icon={faHeartCrack}/>unlike
                    </p>
                }
            </div>
        </div>
     )
}

export default Product;