import React,{useEffect, useState} from 'react'
import styles from './myStore.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {counterTotalProduct,} from '~/reducer/totalProductSlice'
import Button from '@mui/material/Button';
import {increase,decrease} from '~/reducer/amountSlice'
import SelectProduct from '~/components/selectProduct/selectProduct';


function RenderProduct() {

    const [checkTotal,setCheckTotal]= useState(false)
    const [data,setData]=useState([])
    const totalProduct=useSelector(state=> state.counterProduct)
    const dispatch = useDispatch();
    const [totalPrice,setTotalPrice]=useState(0)
    const [checked,setChecked]= useState([])

    const handleCheck=(id)=>{
        setChecked(prev=>{
        const isCheck=checked?.includes(id)
        setCheckTotal(false)
        if (isCheck) {
            return checked.filter(value=> value !== id)
        }
        else return [...prev,id]
    })
}

    const amountProduct=useSelector(state=>state.amountProduct)

    const handleIncrease=(index)=>{
        dispatch(increase())
        let newData=[...data]
        newData[index].amount+=1
        newData[index].totalPrice=newData[index].amount*newData[index].price
        setData(newData)
    }
    const handleDecrease=(index)=>{
        dispatch(decrease())
        let newData=[...data]
        newData[index].amount-=1
        if (newData[index].amount<=0) {
            newData[index].amount=0
        }
        newData[index].totalPrice=newData[index].amount*newData[index].price
        setData(newData)
    }
    const handleDelete=(index)=>{
        let newData=[...data]
        newData.splice(index,1)
        localStorage.removeItem('myStore')
        localStorage.setItem('myStore',JSON.stringify(newData))
        // setChecked(data2)
        setData(newData)
        dispatch(counterTotalProduct())
    }

    const deleteAll=()=>{
        let newData=[]
        console.log(checked);
        if (checked.length>0){
            data.map( value => {
                let kt=false
                for (let j=0;j<checked.length;j++){
                    if (value._id!==checked[j]){
                        kt=true
                        console.log(value,'=',checked[j]);
                    }
                    else {
                        kt=false
                        break
                    }
                }
                if (kt) newData.push(value)
            })

            localStorage.removeItem('myStore')
            localStorage.setItem('myStore',JSON.stringify(newData))
            setData(newData)
            setChecked([])
            dispatch(counterTotalProduct())
        }
    }

    useEffect(()=>{
        const dataTest=JSON.parse(localStorage.getItem('myStore'))
        let newData=[...dataTest]
        // eslint-disable-next-line array-callback-return
        newData.map((value)=>{
            if (value.amount===null) value.amount=amountProduct
            value.totalPrice=value.price*value.amount
            // if (!value.totalPrice) value.totalPrice='hết hàng'
            value.style='something'
        })
        setData(newData)
        setTotalPrice()
        dispatch(counterTotalProduct())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        let price=0
        if (checked) {
            checked?.map(value => {
                const dataPrice=data.find(item=>item._id === value)
                if (dataPrice?.totalPrice) price+=dataPrice.totalPrice
            })
        }
        setTotalPrice(price)
    },[checked,data])

    const handleCheckTotal=()=>{
        setCheckTotal(()=>{
        if (checkTotal===true) {
            setChecked([])
            return false
        }
        else {
            const isCheck=data.map(value=>value._id)
            setChecked(isCheck)
            return true
        }
        })
    }
    const handleIn=()=>{return}

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <p>Giỏ hàng của bạn </p>
            <p>( Có <span>{totalProduct}</span> sản phẩm trong giỏ hàng)</p>
        </div>
        <div className={styles.navContent}>
            <div className={styles.navTitleProducts}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checkTotal}
                    onChange={()=>handleCheckTotal()}
                    />
                <span>Sản Phẩm</span>
            </div>
            <div className={styles.navTitle}>Đơn Giá</div>
            <div className={styles.navTitle}>Số Lượng</div>
            <div className={styles.navTitle}>Tổng Tiền</div>
            <div className={styles.navTitle}>Thao Tác</div>
        </div>
        { data.map((value,index)=> {
            return(
                <div className={ styles.childProductContainer} key={index}>
                    <div className={styles.childProductContainerDeal}>
                        <div className={styles.ProductDeal}>
                            <span>Deal Sốc</span>
                            <span>Mua kèm deal độc quyền</span>
                            <span>Thêm </span>
                        </div>
                        <div className={ styles.childProduct}>
                            <div className={styles.navTitleProduct}>
                                <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={checked?.includes(value._id)||checkTotal}
                                onChange={()=>handleCheck(value._id)}
                                />
                                <img width='80px' height='80px' src={"https://shope-b3.thaihm.site/" + value.imgP} alt="img_product" />
                                <div className={styles.infoProduct}>
                                    <p>{value.productName}</p>
                                    <img src="" alt="" />
                                </div>
                                <div className={styles.styleProduct} >
                                    <div><SelectProduct info={value} dataThen={data} index={index} set={setData}/></div>
                                    <p><span>Color:</span><span>{value.color}</span></p>
                                    <p><span>Ram:</span><span>{value.ram}</span></p>
                                    <p><span>Rom:</span><span>{value.rom}</span></p>
                                </div>
                            </div>
                            <div className={styles.navTitle}>{value.price?.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</div>
                            <div className={`${styles.navTitle} ${styles.buttonContainer}`}>
                                <Button variant="outlined" className={styles.button} onClick={()=>handleDecrease(index)}>-</Button>
                                <input type='text' className={styles.amount} value={value.amount} onChange={handleIn}/>
                                <Button variant="outlined" className={styles.button} onClick={()=>handleIncrease(index)}>+</Button>
                            </div>
                            <div className={styles.navTitle}>{(value.totalPrice)?.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</div>
                            <div className={styles.navTitle} onClick={()=>handleDelete(index)}><Button variant='outlined'>Xoá</Button></div>
                        </div>
                    </div>
                    <div className={styles.voucher}>
                        <img width='30px' src='https://asset.chiaki.vn/images/category/voucher.png?v=06062022' alt='img_product'></img>
                        <p>Shop voucher giảm giá đến 5%</p>
                        <p>Xem thêm Voucher</p>
                    </div>
                    <div className={styles.voucher}>
                        <img  width='30px' src='data:image/png;base64,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' alt='img_product'></img>
                        <p>Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm ₫25.000 phí vận chuyển đơn tối thiểu ₫99.000</p>
                        <p>Tìm hiểu thêm</p>
                    </div>
                </div>
            )
        })
        }
        <div className={styles.payContainer}>
                            <div className={styles.topPay}>
                                <div>
                                <img  width='30px' src='https://asset.chiaki.vn/images/category/voucher.png?v=06062022' alt='img_product'></img>
                                <p>B5 Shop Voucher</p>
                                </div>
                                <div>
                                    Chon hoặc nhập mã
                                </div>
                            </div>
                            <div className={styles.middlePay}>
                                <input
                                type="checkbox"
                                id='12'
                                className={styles.checkbox}
                                checked={checkTotal}
                                onChange={()=>handleCheckTotal()}
                                />
                                <p>Chon tất cả ({totalProduct})</p>
                                <p onClick={deleteAll}>Xoá</p>
                                <p>Lưu vào mục đã thích</p>
                            </div>
                            <div className={styles.bottomPay}>
                                <p>Tổng thanh toán ( {checked?.length} sản phẩm):  <span>{totalPrice?.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</span></p>
                                <Button className={styles.btnPay} variant="contained" disableElevation>
                                    Mua Hàng
                                </Button>
                            </div>
        </div>
    </div>
  )
}

export default RenderProduct