/* eslint-disable no-useless-escape */
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './checkout.module.scss';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '~/config/axios';
import { postAPIAuth } from '~/config/api';

export const Checkout = () =>{
	const nav = useNavigate()
	const inputName = useRef()
	const phoneNumber = useRef()
	const email = useRef()
	const address = useRef()
	const msg = {}
	const [errMess, setErrMess ] = useState('')
	let phone_regex = /^[0-9\-\+]{9,10}$/;
	const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	const dataCart = JSON.parse(localStorage.getItem('orderData'))
	let token = JSON.parse(localStorage.getItem('Token'))
	const validateName = () => {
		if(inputName.current.value.trim() === ''){
			msg.name = 'Vui lòng nhập tên'
		}
		else if(inputName.current.value.length < 2){
			msg.name = 'Tên tối thiểu 2 ký tự'
		}
		setErrMess(msg)
	}

	const validatePhone = () => {
		if(phoneNumber.current.value.trim() === ''){
			msg.phoneNumber = 'Vui lòng nhập số điện thoại'
		}
		else if(!phone_regex.test(phoneNumber.current.value)){
			msg.phoneNumber = 'Số điện thoại không hợp lệ'
		}
		setErrMess(msg)
	}

	const validateEmail = () =>{
		if(email.current.value.trim() === ''){
				msg.email = 'Vui lòng nhập email'
		}
		else if(!regexEmail.test(email.current.value)){
				msg.email = 'Email không hợp lệ'
		}
		setErrMess(msg)
	}

	const validateAddress = () => {
		if(address.current.value.trim() === ''){
			msg.address = 'Vui lòng nhập địa chỉ'
		}
		else if(address.current.value.length < 6){
			msg.address = 'Địa chỉ tối thiểu 6 ký tự'
		}
		setErrMess(msg)
	}
	const validateAll = () => {
		validateName()
		validatePhone()
		validateEmail()
		validateAddress()
		if(Object.keys(msg).length > 0) return false
		return true
	}

	const handleCreateOrder = async (e) =>{
		e.preventDefault()
		const isValid = validateAll()
		const data = {
			data: dataCart,
			phone: phoneNumber.current.value,
			address: address.current.value
		}
		if(!isValid) return
		try{
			await postAPIAuth('/order/create-order')
		}
		catch(err){
			return err.response.data.message
		}
		axios.post('/order/create-order', data, {headers: {Authorization: token}})
		.then(res => {
				localStorage.removeItem('list_cart');
				localStorage.removeItem('orderData');
				toast.success('Đặt hàng thành công')
				nav('/')
		})
		.catch(err => console.log(err))
	}
	return (
		<div className={styles.paymentInfo}>
			<div className={styles.paymentInfo__header}>
				<h3>
					Thông tin thanh toán{' '}
					<div className={styles.paymentInfo__header__backs}>
						<Link to={'/myStore'}>
							<p>
								{' '}
								<LeftOutlined />
								Trở về
							</p>
						</Link>
					</div>
				</h3>
			</div>
			<div className={styles.paymentInfo__content}>
				<h2>Thông tin khách hàng</h2>
				<div className={styles.paymentInfo__content__info}>
					<input
						name='name'
						type='text'
						className={styles.paymentInfo__content__input}
						placeholder='Tên người nhận( bắt buộc )'
						ref={inputName}
						onInput={validateName}
					/>
					<p className={styles.warning}>{errMess.name}</p>
					<input
						name='phoneNumber'
						type='number'
						className={styles.paymentInfo__content__input}
						placeholder='Sô điện thoại( bắt buộc )'
						ref={phoneNumber}
						onInput={validatePhone}
					/>
					<p className={styles.warning}>{errMess.phoneNumber}</p>
					<input
						type='email'
						className={styles.paymentInfo__content__input}
						placeholder='Email( bắt buộc )'
						ref={email}
						onInput={validateEmail}
					/>
					<p className={styles.warning}>{errMess.email}</p>
				</div>
				<h2>Chọn hình thức giao hàng</h2>
				<div className={styles.paymentInfo__content__info1}>
					<div className={styles.paymentInfo__content__info1__radio}>
						<input
							type='radio'
							name='check'
							className={styles.paymentInfo__content__input__radio}
						/>{' '}
						Nhận tại cửa hàng
					</div>
					<div className={styles.paymentInfo__content__info1__radio}>
						<input
							type='radio'
							name='check'
							className={styles.paymentInfo__content__input__radio}
						/>
						Giao tận nơi
					</div>
				</div>
				<input
					type='text'
					className={styles.paymentInfo__content__input}
					placeholder='Địa chỉ cụ thể( bắt buộc)'
					ref={address}
					onInput={validateAddress}
				/>
					<p className={styles.warning}>{errMess.address}</p>
				<input
					type='text'
					className={styles.paymentInfo__content__input}
					placeholder='Mã giảm giá( không bắt buộc)'
				/>
			</div>
			<div className={styles.Cart__content__list__buy1}>
				<div className={styles.Cart__content__list__buy1__price}>
					<p>Tổng tiền tạm tính: </p>
					<p>
						{(window.localStorage.getItem('totalPrice'))?.toLocaleString(
							'vi-VN',
							{ style: 'currency', currency: 'VND' },
						)}
					</p>
				</div>
				<div className={styles.Cart__content__list__buy1__btns}>
					<Link>
						{' '}
						<p className={styles.Cart__content__list__buy1__btn1} onClick={handleCreateOrder}>Đặt hàng</p>
					</Link>
					<Link to={'/'}>
						{' '}
						<p className={styles.Cart__content__list__buy1__btn2}>
							Chọn thêm sản phẩm khác
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}