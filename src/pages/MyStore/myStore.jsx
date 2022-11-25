import styles from './myStore.module.scss'
import RenderProduct from './renderProduct'
import RenderNoneProduct from './renderNoneProduct'
import {useSelector } from 'react-redux'

function MyStore() {
  const totalProduct=useSelector(state=>state.counterProduct)
  return (
    <>  
    <div className={styles.container}>
        <h1>Giỏ hàng của bạn</h1>
    </div>
    { (totalProduct>0)?<RenderProduct/>:<RenderNoneProduct/>
    }
    </>
  )
}

export default MyStore