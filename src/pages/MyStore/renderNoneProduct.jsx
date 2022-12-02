import React from 'react'
import styles from './myStore.module.scss'
import {Link} from 'react-router-dom';
function RenderNoneProduct() {
  return (
   <center>
     <div className={styles.empty}>
      <h1>Giỏ hàng của bạn trống </h1>
      <Link to='/' className={styles.link}>Mua ngay</Link>
     </div>
   </center>
  )
}

export default RenderNoneProduct