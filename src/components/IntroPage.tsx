'use client'
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';


import { BsCash , BsCheckCircle, BsTruck, BsFillHeartFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';

const IntroPage=()=>{
	const { push } = useRouter();

	return(
		<section className="intro-container pt-5 mt-5">
			<div className="pull-left">
				<img className="icon-1" src="/images/icon-1.png" alt="icon decore 1"/>
				<img className="icon-2" src="/images/icon-2.png" alt="icon decore 2"/>
				<img className="icon-3" src="/images/icon-3.png" alt="icon decore 3"/>
			</div>
			<div>
				<Row className="align-items-center">
			        <Col md={7}>
			        	<div className="w-100 text-center">
			        		<h1 className="fw-bolder mb-3">Giặt ủi rất đơn giản.</h1>
			        		<p className="fs-5 text-muted">Là dịch vụ giặt chuyên nghiệp, thu thập, làm sạch, giao đồ giặt và sấy khô đến tận nhà chỉ trong 6 giờ.</p>
			        	</div>
			        	
			        	<div className="px-xl-5 w-100">
			        		<button 
								className="w-100 btn btn-lg btn-wash text-white fw-bold btn-use fs-6"
								onClick={()=>{
									push('/don-hang')
								
								}}
							>Làm Thế nào để sử dụng dịch vụ?</button>
			        		<button className="mt-3 w-100 btn btn-lg text-muted btn-price fs-6">dịch vụ có giá bao nhiêu?</button>
			        	</div>

			        	<div className="mt-3 px-xl-5 w-100">
			        		<ul className="list-unstyled text-left">
			        			<li><BsCash className="text-success mb-1 me-2 opacity-75"/>   Không cần trả trước. Thanh toán khi giao hàng.</li>
			        			<li><BsCheckCircle className="text-success mb-1 me-2 opacity-75"/>   Quần áo của bạn không giặt chung với khách hàng khác.</li>
			        			<li><BsTruck className="text-success mb-1 me-2 opacity-75" />   Miễn phí thu thập và giao hàng.</li>
			        			<li><BsFillHeartFill className="text-success mb-1 me-2 opacity-75"/>   được khách hàng yêu thích.</li>
			        		</ul>
			        	</div>
			        </Col>
			    	<Col>
			    		<div className="w-100">
			    			<figure>
							  <Image className="img-intro" src="/images/intro-giat-ui.jpg" alt="dịch vụ giặt ủi ở vĩnh long" fluid rounded/>
							</figure>
			    			
			    		</div>
			    	</Col>
			    </Row>
			</div>
			<div className="pull-right">
				<img className="icon-4" src="/images/icon-4.png" alt="icon decore 4"/>
				<img className="icon-5" src="/images/icon-5.png" alt="icon decore 5"/>
				<img className="icon-6" src="/images/icon-6.png" alt="icon decore 6"/>
			</div>
		</section>
	)
}

export default IntroPage;