/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";


import styles from "./category.module.scss"
import axios from "~/axios";
import HomeStore from "~/components/HomeStore/homeStore";
import Product from "~/components/Product/product";
import SlideShow from "~/components/SlideShow/slideauto"


const cx =classNames.bind(styles)

function Category() {
    const {categoryID} = useParams()
    const [category,setCategory] = useState([])
    const [branchs,setBranchs] = useState([])
    const [filter,setFilter] = useState(null)
    const [active,setActive] = useState(null)
    const [searchParam,setSearchParam] = useSearchParams()
    
    useEffect(() => {
          axios.get(`/product/get-all-products`)
               .then (res => {
                    let data = res.data.products
                    let productByCategory = data.filter(item => {
                         return item.categoryId.categoryName === categoryID
                    })
                    let branchs = productByCategory.map(item => {
                         return item.brand
                    })
                    setBranchs([...new Set(branchs)])
                    setCategory(productByCategory)
          })
          return () => {
               setFilter(null)
          }
    },[categoryID])
    const handleClick = (name,index) => {
          let data = category.filter(item => {
               return item.brand === name
          })
         setFilter(data)
         setActive(index)
         setSearchParam({filters:name})
    }
    return ( 
       <> 
          <SlideShow/>
          <div className={cx("name-filter")}>
               {branchs.map((item,index) => {
                    return ( <p className={active === index ? cx('active') : null}key={item} onClick={()=> handleClick(item,index)} >{item}</p>)
               })}
          </div>
          <p className={cx("title")}>{categoryID}</p>
          <div className={cx("wrapper")}>
          { !filter ? category.map(item => {
               return (<Product  key={item._id} data={item} isload={true}/>)
          }):
             filter.map(item => {
               return (<Product key={item._id} data={item} isload={true}/>)
             })
          }
          </div>
          <HomeStore/>
       </>
     );
}

export default Category;