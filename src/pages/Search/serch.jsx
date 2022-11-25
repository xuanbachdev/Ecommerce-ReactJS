/* eslint-disable no-unused-vars */

import HomeStore from "~/components/HomeStore/homeStore";
import Product from "~/components/Product/product";
import classNames from "classnames/bind";
import SlideShow from "~/components/SlideShow/slideauto"
import {useEffect,useState} from "react"
import styles from "./search.module.scss"
import { useSearchParams } from "react-router-dom";
import axios from "~/axios";

const cx = classNames.bind(styles)
function Search() {
   const [data,setData] = useState([])
   const [searchPrams,setSearchPrams] = useSearchParams()
   const value = searchPrams.get('filter')
   useEffect(()=>{
        axios.get(`/product/find-products-by-name?productName=${value}`)
            .then(res =>  {
                setData(res.data.products)
            })
   },[value])
    
    return ( 
        <>
            <SlideShow/>
            <div className={cx('res')}>
                <h1>Tìm Kiếm</h1>
                <p>Có {data.length} sản phẩm tìm kiếm</p>
            </div>
            <div  className={cx('wrapper')}>
                {data.map(item => {
                    return (
                        <Product key={item._id} data={item} isload={true}/>
                    )
                })} 
            </div>
            <HomeStore/>
        </>
     );
}

export default Search;