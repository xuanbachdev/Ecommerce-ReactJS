/* eslint-disable array-callback-return */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import styles from './select.module.scss'
import classNames from "classnames/bind";
import {useState,useEffect} from 'react'
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Shop2Icon from '@mui/icons-material/Shop2';
import Modal from '@mui/material/Modal';

const cx = classNames.bind(styles)

function SelectProduct({info,dataThen,index,set}) {
    const [form,setForm]=useState({color:null,ram:null,rom:null,amount:null,imgP:info.imgP})
    const [amount,setAmount]=useState(info.amount)
    useEffect(()=>{
        setAmount(info.amount)
        setForm(()=>{
            let data={...form}
            data.amount=amount
            return data
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleIncrease=()=>{
        info.amount+=1
        setForm(()=>{
            let data={...form}
            data.amount=info.amount
            document.getElementById('input').value=info.amount
            return data
        })
    }
    const handleDecrease=()=>{
        if (info.amount>0) info.amount-=1
        else info.amount=0
        setForm(()=>{
            let data={...form}
            data.amount=info.amount
            document.getElementById('input').value=info.amount
            return data
        })
    }
    const [data,setData]=useState([])

    const [state, setState] = React.useState({bottom: false})

    const [src,setSrc]= useState(info.listDtail[0].listImg[0])

    const handleSrc = (index) =>{setSrc(data[index])}

    const [dataColor,setDataColor]=useState(()=>{
        let prev=info.listDtail.map(value=> {
                return {id:value.color,open:false}
            })
        return prev
    })
    const [dataRam,setDataRam]=useState(()=>{
        let prev=info.listDtail.map(value=> {
                return value.ram
            })
        let array=[...new Set(prev)]
        let data=array.map(v=>{return {id:v,open:false}})
        return data
    })
    const [dataRom,setDataRom]=useState(()=>{
        let prev=info.listDtail.map(value=> {
                return value.rom
            })
        let array=[...new Set(prev)]
        let data=array.map(v=>{return {id:v,open:false}})
    return data
    })

    const Active=({info1,index})=>{
        const isActive=()=>{
            for (let i of dataColor){
                if (i.id===info1)(i.open)?i.open=false:i.open=true
                else i.open=false
            }
            setDataColor([...dataColor])
            info.listDtail.map((value)=>{
                if (value.color===info1) form.imgP=value.listImg[0]
            })
            setForm(()=>{
                let data={...form}
                data.color=info1
                return data
            })
        }
        return(
             dataColor[index].open?
                <span id={cx(`active`)}  onClick={()=>isActive()}>
                    {info1}
                </span>
            :   <span  onClick={()=>isActive()}>
                    {info1}
                </span>
        )
    }
    const Active2=({info1,index})=>{
        const isActive=()=>{
            for (let i of dataRam){
                if (i.id===info1)(i.open)?i.open=false:i.open=true
                else i.open=false
            }
            setDataRam([...dataRam])
            setForm(()=>{
                let data={...form}
                data.ram=info1
                return data
            })
        }
        return(
             dataRam[index].open?
                <span id={cx(`active`)}  onClick={()=>isActive()}>
                    {info1}
                </span>
            :   <span  onClick={()=>isActive()}>
                    {info1}
                </span>
        )
    }
    const Active3=({info1,index})=>{
        const isActive=()=>{
            for (let i of dataRom){
                if (i.id===info1)(i.open)?i.open=false:i.open=true
                else i.open=false
            }
            setDataRom([...dataRom])
            setForm(()=>{
                let data={...form}
                data.rom=info1
                return data
            })
        }
        return(
             dataRom[index].open?
                <span id={cx(`active`)}  onClick={()=>isActive()}>
                    {info1}
                </span>
            :   <span  onClick={()=>isActive()}>
                    {info1}
                </span>
        )
    }

    useEffect(()=>{
        setData(()=>{
            let newdata=[]
            info.listDtail.map((value, index) => {
                value.listImg.map(item=>{
                    newdata.push(item)
                })
            })
        return [...newdata]
    })

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  const toggleDrawer = (bottom, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [bottom]: open });
  };

  const style = {
    textAlign:'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '10%',
    height:'10%',
    bgcolor: 'white',
    border: '0.5px solid #05a',
    padding:'2% 1% 0 1%'
  }
  const handleSubmit=(index) => {
    if (!form.color || !form.ram || !form.rom || !form.amount ) {
        setText('Mời chọn phân loại hàng')
        setOpen(true)
    }
    if (form.color && form.ram && form.rom && form.amount ) {
        let kt=false
            for(let i of info.listDtail)
                if(i.color===form.color && i.ram===form.ram && i.rom===form.rom) {
                    kt=true
                    break
                }
            if (kt===false) {
                      setText('Sản phẩm đã hết hàng')
                      setOpen(true)
             }
            if (kt===true){
                let newData=[...dataThen]
                for (let i of newData)
                    if (i._id===info._id) {
                        i.color=form.color
                        i.ram=form.ram
                        i.rom=form.rom
                        i.amount=form.amount
                        i.imgP=form.imgP
                        newData[index].totalPrice=form.amount*newData[index].price
                        break
                    }
            setState('bottom',state);
            set(newData)
    }
  }
}
    const handleIn=(e)=>{

    }
    const [open, setOpen] = useState(false);
    const [text,setText] = useState('')

    function BasicModal({handleSubmit,text,index}) {

    const handleClose = () => setOpen(false)
    return (
      <div>
        <Button onClick={()=>handleSubmit(index)}  className={cx('submit1')} variant="outlined">Thêm vào giỏ</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography >
              {text}
            </Typography>
          </Box>
        </Modal>
      </div>
    )
  }
  const list = (bottom) => (
    <Box
      sx={{ width: bottom === 'top' || bottom === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
    <List>
        <div className={cx('box')} style={{width:'100%',height:'400px'}}>
            <div className={cx('select-container')}>
                <div className={cx('left')}>
                    <div className={cx('img-main')}>
                        <img style={{height:'80%',marginTop:'10%'}} src={"https://shope-b3.thaihm.site/" +src} alt="" />
                    </div>
                    <div className={cx('imgs')}>
                        {
                            data.map((value,index)=>{
                                return(
                                    <div key={index} onMouseOver={()=>handleSrc(index)} className={cx('imgs-child')}>
                                        <img style={{height:'100%'}} src={"https://shope-b3.thaihm.site/" + value} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={cx('right-select')}>
                        <p >{info.productName}</p>
                        <div className={cx('rate')}>
                            <IconBreadcrumbs className={cx('rates')}/>
                            <p>Tố cáo</p>
                        </div>
                        <div className={cx('price')}>
                            <p>{(info.price*50/100)?.toLocaleString('en-US',{style : 'currency', currency : 'VND'})}</p>
                            <p>{info.price?.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p>
                            <p>Giảm 50%</p>
                        </div>
                        <div className={cx('insurance')}>
                            <span>Bảo hiểm</span>
                            <span>Mới</span>
                            <span>Tìm hiểu thêm</span>
                        </div>
                        <div className={cx('ship')}>
                            <span>Vận chuyển</span>
                            <div>
                                <div>
                                    <LocalShippingIcon/><p>Vận chuyển tới</p>
                                </div>
                                <p>Phí vận chuyển</p>
                                <p>Bảng quy đổi kích cỡ <ArrowDropDownIcon/></p>
                            </div>
                            <div className={cx('type-select')}>

                            <div className={cx('type')}><span  className={cx('type1')}>Color:</span>
                            {
                                dataColor.map((value,index)=>{
                                    return(
                                        <Active key={index} info1={value.id} index={index}/>
                                    )
                                })
                            }
                            </div>
                            <div className={cx('type')}><span className={cx('type1')}>Ram:</span>
                            {
                                dataRam.map((value,index)=>{
                                    return(
                                        <Active2 key={index} info1={value.id} index={index}/>
                                    )
                                })
                            }
                            </div>
                            <div className={cx('type')}><span  className={cx('type1')}>Rom:</span>
                            {
                                dataRom.map((value,index)=>{
                                    return(
                                        <Active3 key={index} info1={value.id} index={index}/>
                                    )
                                })
                            }
                            </div>
                            </div>
                        </div>
                        <div className={cx('price-total')}>
                            <span>Số lượng</span>
                            <Button variant="outlined" className={cx('button')} onClick={()=>handleDecrease(index)}>-</Button>
                                <input  id='input' className={cx('amount')} defaultValue={info.amount} onBlur={(e)=>handleIn(e)}></input>
                            <Button variant="outlined" className={cx('button')} onClick={()=>handleIncrease(index)}>+</Button>
                            <p>99 Sản phẩm có sẵn</p>
                        </div>
                        <div className={cx('btn')}>
                            <BasicModal handleSubmit={handleSubmit} index={index} text={text}/>
                            <Button className={cx('submit2')} variant="contained">MUA NGAY</Button>
                        </div>
                        <div className={cx('last-select')}>
                            <Shop2Icon className={cx('shop-icon')}/>
                            <p>B5 Shop Đảm Bảo</p>
                            <p>1 Ngày Trả Hàng / Hoàn Tiền</p>
                        </div>
                </div>
            </div>
        </div>
    </List>
      <Divider />
    </Box>
  )

  function IconBreadcrumbs() {
    return (
      <div role="presentation" style={{fontSize:'150%'}}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="red"
            href="/"
            fontSize='120%'
          >
            <StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/>
          </Link>
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="black"
            href="/material-ui/getting-started/installation/"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            7 Đánh giá
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="black"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            100 Đã bán
          </Typography>
        </Breadcrumbs>
      </div>
    );}

  return (
    <div>

        <React.Fragment key='bottom'>
          <Button style={{fontSize:'70%'}} onClick={toggleDrawer('bottom', true)}>
            Phân Loại Hàng
            <KeyboardArrowDownSharpIcon/>
          </Button>
          <Drawer
            anchor='bottom'
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}
          >
            {list('bottom')}
          </Drawer>
        </React.Fragment>

    </div>
  );
}

export default SelectProduct