'use client'
import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../app/lib/action';





const LoginForm=(props:any)=>{
	
	const [code, action] = useFormState(authenticate, undefined);
	
	
	
	


	// const handleSubmit = async(event) => {
	//  	event.preventDefault(); 	
	//  	try {
	//       const result = await authenticate(undefined, newPost);
	//       console.log("hehe"+result)
	      
	//     } catch (error) {
	//       // Handle other errors
	//       console.error('Authentication error:', error);
	//     }
	// }

	return(

		<div className="mb-7 p-2 w-100 d-flex flex-column align-items-center justify-content-center">
			<div className="text-center fw-bolder text-danger w-50">
				  {code && (
		            <>
		             
		              <p>
		                *{code}
		              </p>
		            </>
		          )}
			</div>
			<Form action={action} className="rs-form w-50">
		<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			<Form.Label className="title fs-5">Địa chỉ Email</Form.Label>
			<Form.Control
				required 
				name="email"
				type="email"	       
				style={{height:55}} 
				onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('Email bạn nhập chưa chính xác!')}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('')}
			/>
		</Form.Group>
		       <Form.Control
			        name="role"
			        type="hidden"
			        value="USER"
		        />
		<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
			<Form.Label className="title fs-5">Mật khẩu</Form.Label>
			<Form.Control
				required 
				name="password"
				type="password"
				style={{height:55}}
				onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('Mật khẩu không được bỏ trống!')}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('')}
			/>
		</Form.Group>
		      <Form.Group style={{height:70}} className="d-flex align-items-center mb-3">
		      	<Link onClick={()=>props.param("register")} href="tai-khoan?register" className="w-75 text-wash custom-link title">đăng ký</Link>
		        <Button 
		        	className="btn btn-wash text-white fw-bold"
		        	type="submit"
		        	style={{
		        		width:150,
		        		height: 50
		        	}}
		        >
		        	Login
		        </Button>
		      </Form.Group>
		    </Form>
		</div>
	)
}

export default LoginForm;

