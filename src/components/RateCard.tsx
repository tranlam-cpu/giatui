'use client'
import React from 'react'
import Card from 'react-bootstrap/Card';
import { BsStarFill } from "react-icons/bs";
import CardFooter from 'react-bootstrap/CardFooter'
import Image from 'react-bootstrap/Image';

interface RateCardProps{
	id:number,
	name:string,
	avatar:string,
	content:string
}
// React.FC<DataTableCommon>=({values,header,footer,th})
const RateCard:React.FC<RateCardProps>=({id,name,avatar,content})=>{
	return(
		<Card className="mx-auto" style={{ width: '20rem', border:'none', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
	      <Card.Body>
	        <Card.Title>
	        	<BsStarFill style={{ color:'#ffcd3c'}} className="me-1"/> 
	        	<BsStarFill style={{ color:'#ffcd3c'}} className="me-1"/>
	        	<BsStarFill style={{ color:'#ffcd3c'}} className="me-1"/>
	        	<BsStarFill style={{ color:'#ffcd3c'}} className="me-1"/>
	        	<BsStarFill style={{ color:'#ffcd3c'}} className="me-1"/>
	        </Card.Title>
	        <Card.Subtitle className="mb-2 text-muted">Nhận xét nổi bật</Card.Subtitle>
	        <Card.Text style={{height:'15rem'}} className="mt-3 overflow-auto">
	          {content}.
	          
	        </Card.Text>
	        <Card.Footer className="py-3 fw-bolder bg-white">
				<Image src={avatar} width={35} height={35} roundedCircle /> 
				<span className='ps-3'>{name}</span>
          	</Card.Footer >
	      </Card.Body>
	      
	    </Card>
	)
}

export default RateCard