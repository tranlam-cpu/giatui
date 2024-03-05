'use client'
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer=()=>{
	return(
		<footer className="bg-dark text-white fw-bold px-xl-6 px-5 py-5">
			<Row>
	        	<Col className="logo">Giặt ủi</Col>
	        	<Col sm>
	        		<div>
	        			<Row>
	        				<Col>@gmail.com</Col>
	        			</Row>
	        			<Row>
	        				<Col>0123456789</Col>
	        			</Row>
	        		</div>
	        	</Col>
	        </Row>
	        <Row className="pt-4">
	        	<hr className="border-3"/>
	        </Row>
	        <Row className="text-center">
	        	<Col sm className="border border-top-0 border-bottom-0 border-start-0">@copyright2023 giatui</Col>
	        	<Col className="border border-top-0 border-bottom-0 border-start-0">FAQs</Col>
	        	<Col className="border border-top-0 border-bottom-0 border-start-0">Term and Conditions</Col>
	        	<Col className="border border-top-0 border-bottom-0 border-start-0">privacy policy</Col>
	        	<Col sm >All Right Reserved</Col>
	        </Row>
		</footer>
	)
}

export default Footer