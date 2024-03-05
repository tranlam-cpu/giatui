'use client'
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const WorkPage=()=>{
	return(
		<section className="pt-5 mt-5">
			<h2 className="text-center">Quy trình hoạt động của dịch vụ</h2>
			<Row className="pt-5 mt-3">
				<Col md className="mb-5">
					<figure className="d-inline-flex d-md-flex flex-md-column w-100">
					  <div className="circular--portrait w-75 h-75">
					  	<Image src="images/wp1.jpg" alt="dịch vụ giặt ủi ở vĩnh long" roundedCircle />
					  </div>
					  <figcaption className="ps-md-0 ps-4">
					  	<h3 className="text-center mt-4">Đặt đơn hàng</h3>
					  	<p>Chỉ trong vài giây, bạn sẽ nhận được ước tính giá. Chúng tôi sẽ cử tài xế đến lấy đồ giặt của bạn trong thời gian sớm nhất.</p>
					  </figcaption>
					</figure>
				</Col>
				<Col md className="mb-4">
					<figure className="d-inline-flex flex-row-reverse d-md-flex flex-md-column w-100">
					  <div className="circular--portrait w-md-100 h-md-100 w-75 h-75">
					  	<Image src="images/wp2.jpg" alt="dịch vụ giặt ủi ở vĩnh long" roundedCircle />
					  </div>
					  <figcaption className="ps-md-0 ps-4">
					  	<h3 className="text-center mt-4">Thu thập</h3>
					  	<p>Chúng tôi sẽ thu gom đồ giặt của bạn trực tiếp từ nhà hoặc khách sạn của bạn. Nhận và giao hàng luôn miễn phí trong nội thành TP.</p>
					  </figcaption>
					</figure>
				</Col>
				<Col md className="mb-4">
					<figure className="d-inline-flex d-md-flex flex-md-column w-100">
					  <div className="circular--portrait w-md-100 h-md-100 w-75 h-75">
					  	<Image src="images/wp3.jpg" alt="dịch vụ giặt ủi ở vĩnh long" roundedCircle />
					  </div>
					  <figcaption className="ps-md-0 ps-4">
					  	<h3 className="text-center mt-4">Đội làm sạch</h3>
					  	<p>Đồ giặt của bạn sẽ được đưa đến cơ sở của chúng tôi, nơi đội ngũ chuyên gia của chúng tôi kiểm tra tại chỗ và theo dõi từng món đồ. Chúng tôi chỉ sử dụng những sản phẩm chất lượng tốt nhất để giữ cho quần áo của bạn luôn trông như mới.</p>
					  </figcaption>
					</figure>
				</Col>
				<Col md className="mb-4">
					<figure className="d-inline-flex flex-row-reverse d-md-flex flex-md-column w-100">
					  <div className="circular--portrait w-md-100 h-md-100 w-75 h-75">
					  	<Image src="images/wp4.jpg" alt="dịch vụ giặt ủi ở vĩnh long" roundedCircle />
					  </div>
					  <figcaption className="ps-md-0 ps-4">
					  	<h3 className="text-center mt-4">Giao hàng</h3>
					  	<p>Đồ giặt sạch sẽ được trả lại cho bạn sau ít nhất 6 giờ với dịch vụ chuyển phát nhanh của chúng tôi hoặc 24 giờ với dịch vụ tiêu chuẩn của chúng tôi.</p>
					  </figcaption>
					</figure>
				</Col>
			</Row>
		</section>
	)
}


export default WorkPage;