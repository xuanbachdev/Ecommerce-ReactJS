import {useState,useEffect} from "react"
import axios from "~/axios";
import ContaierProduct from "~/components/ContaierProduct/ContaierProduct";
import classNames from "classnames/bind";
import styles from "./home.module.scss"
import IconCategory from "./IconCategory";
import HomeStore from "~/components/HomeStore/homeStore";


const cx= classNames.bind(styles)
function Home() {
  const [catgoryObj,setCategoryObj] = useState([])

  useEffect(() => {
    axios.get('/category/get-all-categories')
      .then (res => {
        const data = res.data.categories  
        setCategoryObj(data)
      }) 
  },[])
    return  ( 
        <>
          <div>
            <div className={cx("slider")}></div>
            <ul className={cx('icons')}>
              {catgoryObj.map(item=> {
                return (
                  <IconCategory key={item._id} data={item}/>
                )
              })}
            </ul>
          </div>
          <ContaierProduct/>
          <HomeStore/>
        </>
     );
}

export default Home;