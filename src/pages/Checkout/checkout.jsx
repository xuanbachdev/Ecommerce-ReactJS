import { useState } from 'react';
import { Link } from 'react-router-dom';
export const Checkout = () => {
	const [name, setName] = useState();
	const [address, setAdress] = useState();

	const handeleSubmit = (e) => {
		e.preventDefault();
		console.log(name, address);
	};
	return (
		<div>
			<form
				className='flex w-[50%] m-auto h-screen pt-[74px]'
				onSubmit={handeleSubmit}
			>
				<div className='w-[60%] px-4'>
					<div className='text-sm space-x-2'>
						<div className='bg-gray-100 space-x-2 py-3 pl-4 rounded-lg'>
							<Link to='/cart' className='text-blue-500'>
								Giỏ hàng
							</Link>
							<span className='border-l-2 border-gray-300 pl-2'>
								Thanh toán
							</span>
						</div>
					</div>
					<div className='space-y-4 pt-10'>
						<div>
							<p className='text-xl font-bold'>Thông tin giao hàng</p>
						</div>
						<div>
							<input
								type='text'
								placeholder='Họ tên...'
								className='py-4 px-2 border border-gray-200 w-full rounded-lg text-base text-black outline-none'
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<input
								type='text'
								placeholder='Sđt...'
								className='py-4 px-2 border border-gray-200 w-full rounded-lg text-base text-black outline-none'
								onChange={(e) => setAdress(e.target.value)}
							/>
						</div>
						<div>
							<textarea
								name=''
								id=''
								cols='30'
								rows='10'
								placeholder='Địa chỉ...'
								className='border rounded-lg w-full p-2 outline-none'
							></textarea>
						</div>
					</div>
				</div>
				<div className='bg-gray-100 px-8 w-[40%] pt-6 space-y-4 rounded-lg'>
					<div className='py-6 border-t-2 flex justify-between'>
						<input
							type='text'
							placeholder='Mã giảm giá'
							className='p-3 border rounded-lg border-gray-200'
						/>
						<button className='py-3 px-8 bg-blue-400 text-white  rounded-lg hover:bg-blue-800'>
							Sử dụng
						</button>
					</div>
					<div className='py-6 border-t-2 flex justify-between'>
						<p className='font-semibold'>Phí vận chuyển</p>
						<p className='font-semibold'>Miễn phí vận chuyển</p>
					</div>
					<div className='py-6 border-t-2 flex justify-between'>
						<p className='font-bold'>Tổng cộng</p>
						<p className='space-x-1'>
							<span>VNĐ</span>
							<span>859000</span>
							<span>đ</span>
						</p>
					</div>
					<div className='border border-orange-600 py-4 px-2'>
						Chúng tôi sẽ XÁC NHẬN đơn hàng bằng TIN NHẮN SMS hoặc GỌI ĐIỆN. Bạn
						vui lòng kiểm tra TIN NHẮN hoặc NGHE MÁY ngay khi đặt hàng thành
						công và CHỜ NHẬN HÀNG
					</div>
					<div className='float-right hover:bg-blue-800'>
						<button className='px-6 py-4 bg-blue-500 text-lg rounded-lg text-white'>
							Hoàn tất đơn hàng
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
