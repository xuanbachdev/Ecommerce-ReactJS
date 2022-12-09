import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './checkout.module.scss';

export const Checkout = () =>{
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
						type='text'
						className={styles.paymentInfo__content__input}
						placeholder='Tên người nhận( bắt buộc)'
					/>
					<input
						type='number'
						className={styles.paymentInfo__content__input}
						placeholder='Sô điện thoại( bắt buộc)'
					/>
					<input
						type='email'
						className={styles.paymentInfo__content__input}
						placeholder='Email( bắt buộc)'
					/>
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
				/>
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
						{(window.localStorage.getItem('totalPrice')).toLocaleString(
							'vi-VN',
							{ style: 'currency', currency: 'VND' },
						)}
					</p>
				</div>
				<div className={styles.Cart__content__list__buy1__btns}>
					<Link>
						{' '}
						<p className={styles.Cart__content__list__buy1__btn1}>Đặt hàng</p>
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