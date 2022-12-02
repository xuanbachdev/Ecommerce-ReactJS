/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./DetailProduct.module.scss"
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faLocationDot,
    faMagnifyingGlass,
    faMinus, faNoteSticky,
    faPhone, faPlus,
    faTruckFast
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeStore from "~/components/HomeStore/homeStore";
import { counterTotalProduct, } from '~/reducer/totalProductSlice'
import { useDispatch } from "react-redux";
import Alert from '~/components/Alert/alert';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Modal from "~/components/Modal/modal";

const cx = classNames.bind(styles)
var clone = [{
    price: "",
    ram: "",
    rom: "",
    status: ""
}]
function Person() {
    let nav=useNavigate()
    const  [isOpen,setIsOpen] = useState(false);
    const toggle=()=>{
        setIsOpen(!isOpen)
    }

    const disPatch = useDispatch()
    const user=localStorage.getItem('email')
    const { productID } = useParams()
    const [product, setProduct] = useState({})
    const [, setListProduct] = useState()
    const [count, setCount] = useState(1)
    const [listDtail, setListDtail] = useState([])
    const [secondListDtail, setSecondListDtail] = useState(clone)
    const [src, setSrc] = useState()
    const [srcSide, setSrcSide] = useState([])
    const [addressHn, setAddressHn] = useState(true)
    const [addressHCM, setAddressHCM] = useState(true)
    const [addressAll, setAddressAll] = useState(false)
    const [disable, setDisable] = useState(true)
    const [active, setActive] = useState(false)
    const [activeColor, setActiveColor] = useState(-1)
    const [hideExchange, setHideExchange] = useState(true)
    const [showExchange, setShowExchange] = useState(false)
    const [favourite, setFavourite] = useState(true)
    const [bestSalers, setBestSalers] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalImgOpen, setIsModalImgOpen] = useState(false);
    const [valueName, setValueName] = useState('')
    const [valuePhone, setValuePhone] = useState('')
    const [valueAddress, setValueAddress] = useState('')
    var sum = count
    function Minus() {
        if (sum >= 2 && sum <= 20) {
            sum -= 1
            setCount(sum)
        }
    }
    function Add() {
        if (sum >= 1 && sum <= 19) {
            sum += 1
            setCount(sum)
        }
    }

    function changeImg(index) {
        var cloneListDtail = [...listDtail]
        var a = cloneListDtail.splice(index, 1)
        setSecondListDtail(a)
        setSrc("https://shope-b3.thaihm.site/" + listDtail[index].listImg[0])
        setActiveColor(index)
        setSrcSide(listDtail[index].listImg)
    }

    function changeStatus() {
        if (secondListDtail[0].status === "disable") {
            setDisable(true)
        }
        else (setDisable(false))
    }

    function changeAddressAll() {
        setAddressAll(false)
        setAddressHn(true)
        setAddressHCM(true)
        setActive(true)
    }

    function changeAddressHn() {
        setAddressHn(false)
        setAddressHCM(true)
        setAddressAll(true)
        setActive(true)
    }

    function changeAddressHCM() {
        setAddressHn(true)
        setAddressHCM(false)
        setAddressAll(true)
        setActive(true)
    }

    function displayExchange() {
        setHideExchange(false)
        setShowExchange(true)
    }

    function hiddenExchange() {
        setHideExchange(true)
        setShowExchange(false)
    }

    function showFavourite() {
        setFavourite(true)
        setBestSalers(false)
    }

    function showBestSalers() {
        setFavourite(false)
        setBestSalers(true)
    }
    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleBuy = () => {
        alert("Mua thành công. Cảm ơn quý khách ^_^");
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const showModalImg = () => {
        setIsModalImgOpen(true);
    }

    const handleOut = () => {
        setIsModalImgOpen(false);
    }
    const HandleAddProduct = () => {
        if (localStorage.getItem('email'))
        {
                toggle()
            let Storage = localStorage.getItem(user)
            if (Storage) {
                Storage = JSON.parse(Storage)
                let infoProduct=product
                infoProduct.amount=count
                infoProduct.color=secondListDtail[0].color
                infoProduct.ram=secondListDtail[0].ram
                infoProduct.rom=secondListDtail[0].rom
                infoProduct.imgP=secondListDtail[0].listImg[0]
                let kt = false
                for (let item of Storage) {
                    if (item.productName === product.productName) {
                        kt = true
                        item.amount += count
                        localStorage.setItem(user, JSON.stringify(Storage))
                        break
                    }
                }
                if (kt === false) {
                    Storage.push(product)
                    localStorage.setItem(user, JSON.stringify(Storage))
                    disPatch(counterTotalProduct())
                    disPatch(counterTotalProduct())
                }
            }
            else {
                let infoProduct=product
                infoProduct.amount=count
                Storage = []
                Storage.push(infoProduct)
                localStorage.setItem(user, JSON.stringify(Storage))
                disPatch(counterTotalProduct())
            }
        }
        else {
            let confirm=window.confirm('Vui lòng đăng nhập')
            if (confirm) nav('/login')
                else return
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
        axios.get(`/product/get-one-product/${productID}`)
            .then(res => {
                setProduct(res.data.product)
                setListDtail(res.data.product.listDtail)
            })
            .catch(err => alert("Lỗi rồi!"))
    }, [productID])

    useEffect(() => {
        axios.get(`/product/get-all-products`)
            .then(res => {
                setListProduct(res.data.products);
            })
            .catch(err => alert("Lỗi rồi!"))
    }, [])

    useEffect(() => {
        setSrc("https://shope-b3.thaihm.site/" + product.thumbnail)
    }, [product])
    return (
        <>
            <Alert
                title={'Thêm sản phẩm thành công - '}
                url={'/myStore'}
                title2={'Tới cửa hàng ngay'}
                isOpen={isOpen}
                hide={toggle}
            />
            <div className={cx("header")}>
                <FontAwesomeIcon icon={faHouse} />
                <Link to="/">Trang Chủ</Link>
                <FontAwesomeIcon icon={faMinus} />
                <span>{product.brand}</span>
                <FontAwesomeIcon icon={faMinus} />
                <span>{product.productName}</span>
            </div>
            <div className={cx("body")}>
                <div className={cx("side_img")}>
                    {listDtail.map((value, index) => {
                        return (
                            <button
                                key={index}
                                onMouseOver={function () { changeImg(index) }}
                            >
                                <img src={"https://shope-b3.thaihm.site/" + value.listImg[0]} alt=""></img>
                            </button>
                        )
                    })}
                </div>
                <div className={cx("main_Img")}>
                    <img className={cx("outside_Img")} src={src} alt={src} />
                    <div onClick={showModalImg}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <button>Click xem hình ảnh lớn hơn</button>
                    </div>
                    <Modal open={isModalImgOpen}>
                        <div className={cx("box_inside_Img")}>
                            {srcSide.map(function(value,index){
                                return (
                                <div key={index} className={cx("inside_Img_side")}>
                                    <img src={"https://shope-b3.thaihm.site/"+ value} alt="" />
                                </div>
                            )})}
                            <div><img className={cx("inside_Img")} src={src} alt={src}/></div>
                        </div>
                        <button className={cx("btn_out")} onClick={handleOut}>Thoát</button>
                    </Modal>
                </div>
                <div className={cx("all_infor")}>
                    <div className={cx("infor")}>
                        <p>Nhãn hiệu: <span>{product.brand}</span></p>
                        <p>Tên sản phẩm: <span>{product.productName}</span></p>
                        <p>Mã sản phẩm: <span>{product._id}</span></p>
                        {secondListDtail.map((value, index) => {
                            return (
                                <div key={index} hidden={disable}>
                                    <p>Giá: <span>{value.price}</span></p>
                                    <p>Ram: <span>{value.ram}</span></p>
                                    <p>Rom: <span>{value.rom}</span></p>
                                    <p>Trạng thái: <span>{value.status}</span></p>
                                </div>
                            )
                        })}
                        Màu Sắc: {listDtail.map((value, index) => {
                            return (
                                <>
                                    <button
                                        key={index}
                                        className={cx(activeColor === index ? "active_item" : "")}
                                        onClick={changeStatus}
                                        onClickCapture={function () { changeImg(index) }}>{value.color}
                                    </button>
                                </>
                            )
                        })}
                        <p><u>(Vui lòng chọn màu khi đặt hàng)</u></p>
                    </div>
                    <div className={cx("addMinus")}>
                        <button onClick={Minus}>-</button>
                        <span>{count}</span>
                        <button onClick={Add}>+</button>
                    </div>
                    <div className={cx("function")}>
                        <button className={cx(disable ? "disable" : "enable")} disabled={disable} onClick={HandleAddProduct}>Thêm Vào Giỏ Hàng</button>
                        <button className={cx(disable ? "disable" : "enable")} disabled={disable} onClick={showModal}>Mua Ngay</button>
                        <Modal open={isModalOpen}>
                            <form>
                                <label>Điền đầy đủ thông tin dưới đây</label>
                                <p>Họ Tên:</p>
                                <input value={valueName} onChange={function (e) { setValueName(e.target.value) }} className={cx("name")} type="text" placeholder="họ và tên"></input>
                                <p>Số điện thoại:</p>
                                <input value={valuePhone} onChange={function (e) { setValuePhone(e.target.value) }} className={cx("phone")} type="text" placeholder="Số điện thoại"></input>
                                <p>Địa chỉ:</p>
                                <input value={valueAddress} onChange={function (e) { setValueAddress(e.target.value) }} className={cx("address")} type="text" placeholder="Địa chỉ"></input>
                            </form>
                            <br></br>
                            <label> Kiểm tra thông Số Sản Phẩm đã chọn:</label>
                            {secondListDtail.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <p>Mã sản phẩm: <span>{value._id}</span></p>
                                        <p>Giá: <span>{value.price}</span></p>
                                        <p>Ram: <span>{value.ram}</span></p>
                                        <p>Rom: <span>{value.rom}</span></p>
                                        <p>Trạng thái: <span>{value.status}</span></p>
                                    </div>
                                )
                            })}
                            <button onClick={handleBuy}>Mua</button>
                            <button onClick={handleCancel}>Cancle</button>
                        </Modal>
                    </div>
                    <div className={cx("shareFB")}>
                        <span>CHIA SẺ</span>
                        <a href="https://www.facebook.com/profile.php?id=100009786037668"><FontAwesomeIcon icon={faFacebook} /></a>
                    </div>
                    <div className={cx("address")}>
                        <button className={cx((active === addressAll) ? "address_active" : "")} onClick={changeAddressAll}>Toàn Quốc</button>
                        <button className={cx((active === addressHn) ? "address_active" : "")} onClick={changeAddressHn}>Hà Nội</button>
                        <button className={cx((active === addressHCM) ? "address_active" : "")} onClick={changeAddressHCM}>Hồ Chính Minh</button>
                        <div hidden={addressAll} className={cx("addressDetail")}>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>265 Trần Đăng Ninh - Phường Dịch Vọng</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>Số 7 Ngõ 76 Nguyễn Chí Thanh, Láng Thượng</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>61 Nguyễn Phi Khanh, P Tân Định</span>
                            </p>
                        </div>
                        <div hidden={addressHn} className={cx("addressNone")}>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>265 Trần Đăng Ninh - Phường Dịch Vọng</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>Số 7 Ngõ 76 Nguyễn Chí Thanh, Láng Thượng</span>
                            </p>
                        </div>
                        <div hidden={addressHCM} className={cx("addressNone")}>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>61 Nguyễn Phi Khanh, P Tân Định</span>
                            </p>
                        </div>
                    </div>
                    <div className={cx("exchange")}>
                        <div hidden={showExchange} onClick={displayExchange}>
                            <span className={cx("text")}>THÔNG SỐ SẢN PHẨM</span>
                            <span className={cx("plusicon")}><FontAwesomeIcon icon={faPlus} /></span>
                        </div>
                        <div hidden={hideExchange} onClick={hiddenExchange}>
                            <span className={cx("text")}>THÔNG SỐ SẢN PHẨM</span>
                            <span className={cx("plusicon")}><FontAwesomeIcon icon={faMinus} /></span>
                            {secondListDtail.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <p>Giá: <span >{value.price}</span></p>
                                        <p>Ram: <span >{value.ram}</span></p>
                                        <p>Rom: <span >{value.rom}</span></p>
                                        <p>Trạng thái: <span >{value.status}</span></p>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <span className={cx("text")}>CHÍNH SÁCH ĐỔI TRẢ</span>
                            <span className={cx("plusicon")}><FontAwesomeIcon icon={faPlus} /></span>
                        </div>
                    </div>
                    <div className={cx("delivery")}>
                        <span><FontAwesomeIcon icon={faTruckFast} /></span>
                        <div>
                            <p>MIỄN PHÍ GIAO HÀNG TOÀN QUỐC</p>
                            <p>(Hoá đơn từ 150,000đ)</p>
                        </div>
                    </div>
                    <div className={cx("delivery")}>
                        <span><FontAwesomeIcon icon={faNoteSticky} /></span>
                        <div>
                            <p>ĐỔI TRẢ DỄ DÀNG</p>
                            <p>(Đổi trả trong vòng 7 ngày)</p>
                        </div>
                    </div>
                    <div className={cx("delivery")}>
                        <span><FontAwesomeIcon icon={faPhone} /></span>
                        <div>
                            <p>TỔNG ĐÀI BÁN HÀNG 0964.26.36.36</p>
                            <p>(Từ 8h30 - 21:30 mỗi ngày)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("other_infor")}>
                <button className={cx(favourite ? "other_infor_btn" : "")} onClick={showFavourite}>CÓ THỂ BẠN THÍCH</button>
                <button className={cx(bestSalers ? "other_infor_btn" : "")} onClick={showBestSalers}>SẢN PHẨM BÁN CHẠY</button>
            </div>
            <HomeStore />
        </>
    );

}

export default Person;