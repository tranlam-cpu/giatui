'use client'
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const WhyServicePage=()=>{
	return(
		<section>
			<Row className="my-auto py-5">
				<Col md className="me-5 my-auto">
					<h2 className="text-left">Lý do bạn nên chọn dịch vụ của chúng tôi?</h2>
					<p className="text-muted">Sứ mệnh của chúng tôi là giúp bạn tiết kiệm được thời gian và thoát khỏi công việc giặt giũ không ngừng nghỉ, mang lại cho bạn thêm thời gian vui vẻ bên gia đình. Bạn cũng cần có một dịch vụ mà bạn cảm thấy hoàn toàn tin tưởng. Tại DVGU, mỗi món đồ bạn gửi cho chúng tôi đều sẽ được chăm sóc một cách tận tình và chuyên nghiệp nhất.</p>
				</Col>
				<Col md>
					<Container className="mx-0 px-0 h-100">
					<Row className="mb-4">
						<Col className="pe-5">
							<h3 className="text-wash">3.5 M+</h3>
							<p className="text-muted">các sản phẩm được làm sạch và giao cho khách hàng.</p>
						</Col>
						<Col className="pe-5">
							<h3 className="text-wash">68.2 K+</h3>
							<p className="text-muted">chúc mừng khách hàng tiết kiệm được thời gian cùng với DVGU.</p>
						</Col>
					</Row>
					<Row className="mb-4">
						<Col className="pe-5">
							<h3 className="text-wash">4.9 / 5</h3>
							<p className="text-muted">lượt bài đánh giá trên facebôok.</p>
						</Col>
						<Col className="pe-5">
							<h3 className="text-wash">100 +</h3>
							<p className="text-muted">khách hàng sử dụng dịch vụ của chúng tôi.</p>
						</Col>
					</Row>
					</Container>
				</Col>
			</Row>		
		</section>
	)
}

export default WhyServicePage;