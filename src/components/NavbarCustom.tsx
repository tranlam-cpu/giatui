'use client'
import React,{ useEffect ,useState } from 'react'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { BsArrowReturnRight } from "react-icons/bs";
import { signOut } from '../../auth';
import { useRouter } from 'next/navigation';


const NavbarCustom=(props:any)=>{

	//redirect
	const { push } = useRouter();

	const [active, setActive] = useState(false);
	const handleHamburgerMenu = ()=>{
	  	setActive(!active); 
	  }

	let body=null

	const actionLogout=async ()=>{
		await signOut();
	}

	if(props.isLogout){
		actionLogout()
	}

	if(props.isauth){
	  	body=(
	  		<form 
	        action={async () => {
	          await signOut();
	        }} 
	        className="d-flex justify-content-center"
	      >
	      	<button type="submit" className="d-lg-block d-none link-wash text-muted border-0 bg-body-tertiary me-2">logout</button>
	      </form>
	  	)
	  }else{
	  	body=(
	  		<Nav.Link href="/tai-khoan" className="d-lg-block d-none link-wash text-muted">Login</Nav.Link>
	  	)
	  }
	return(
		<>
			<Navbar className="bg-body-tertiary">
		      <Container fluid className="p-0 py-2 d-flex justify-content-between">
		      	<div>
		        	<Navbar.Brand className="logo text-wash link-wash" href="#home">Giặt ủi</Navbar.Brand>      
		    		</div>
		    		<div className="d-flex flex-row align-items-center">
		      	  <Nav className="me-auto">
		            <Nav.Link href="/" className="d-lg-block d-none link-wash text-muted">Home</Nav.Link>
		            <Nav.Link href="#features" className="d-lg-block d-none link-wash text-muted">Features</Nav.Link>
		            {/*<form 
			            action={async () => {
				            await signOut();
				          }} 
				          className="d-flex justify-content-center"
			          >
		            	<button type="submit" className="d-lg-block d-none link-wash text-muted border-0 bg-body-tertiary me-2">{user ? "Logout" : "Login"}</button>
		            </form>*/}
		            {body}
		            <button 
						className="btn btn-wash text-white fw-bold btn-buynow"
						onClick={()=>{
							push('/don-hang')
						}}
					>Giặt Ngay <BsArrowReturnRight className="fw-bolder"/></button>
		          </Nav>

		          	<button id="hamburger-menu" className={`d-block d-lg-none ms-3 ${active ? "open" : ""}`} onClick={handleHamburgerMenu}>
				        <span className="hamburger-top"></span>
				        <span className="hamburger-middle"></span>
				        <span className="hamburger-bottom"></span>
				    </button>
		        </div>
		      </Container>
		    </Navbar>

		    <Navbar className={`d-lg-none navbar-mobi ${active ? "open-navbar-mobi" : "close-navbar-mobi"}`}>
			    <Container fluid className="px-5 position-absolute top-0">
			      	<Nav className="d-flex flex-column w-100">
		            <Nav.Link href="/" className="link-wash text-muted fs-4 fw-bold">Home</Nav.Link>
		            <Nav.Link href="#features" className="link-wash fs-4 text-muted fw-bolder">Features</Nav.Link>
		            {props.isauth && <form 
			            action={async () => {
				            await signOut();
				          }} 
				          className="p-2"
			          >
		            	<button type="submit" className="link-wash text-muted fs-4 fw-bold border-0 bg-body-tertiary me-2">Logout</button>
		            </form>
		            }

		            {!props.isauth && 
		            	<Nav.Link href="/tai-khoan" className="link-wash fs-4 text-muted fw-bolder">Login</Nav.Link>
		            }
		            <button 
						className="mt-4 btn btn-wash text-white fw-bold btn-buynow"
						onClick={()=>{
							push('/don-hang')
						}}
					>Giặt Ngay <BsArrowReturnRight className="fw-bolder"/></button>
		          </Nav>
			  	</Container>
		  	</Navbar>
		</>
	)
}

export default NavbarCustom;