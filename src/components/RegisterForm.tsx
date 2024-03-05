'use client'
import React ,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/navigation'

const LoginForm=(props:any)=>{

	const [newPost,setNewPost]=useState({
		email: '',
		password: ''
	})

	const [active, setActive]=useState({
		success: false,
		message: ''
	});
	
	const {email, password }=newPost

	const onChangeNewPostForm = (event:any) => setNewPost({...newPost,[event.target.name]: event.target.value})

	const router= useRouter()
	const handleSubmit = async(event:any) => {
	 	event.preventDefault();
	
	 	if(event.target[1].value!==event.target[2].value){
	 		event.target[2].setCustomValidity('aaaa')
	 		return false;
	 	}else{
	 		try{
	 			const response=await axios.post('/api/users',newPost)
	 			if(response.data.success){
	 				props.param("login")
	 			}
	 			
	 		}catch(error:any){
	 			 if (error.response) {
	 			 	setActive({
	 					'success': error.response.data.success,
	 					'message': error.response.data.message,
	 				});
	 				setTimeout(()=>{
	 					setActive({
		 					'success': true,
		 					'message': '',
		 				});
	 				},3000)
				    // The request was made and the server responded with a status code
				    // that falls out of the range of 2xx
				    console.error('Server responded with an error:', error.response.data);
				    console.error('Status code:', error.response.status);
				  } else if (error.request) {
				    // The request was made but no response was received
				    console.error('No response received from the server');
				  } else {
				    // Something happened in setting up the request that triggered an Error
				    console.error('Error during request setup:', error.message);
				  }
	 		}
	 		
	 		
	 	}

	 	
	 	

	};


	return(
		<div className="mb-7 p-2 w-100 d-flex flex-column align-items-center justify-content-center">
			<div className="text-center fw-bolder text-danger w-50">
				  {!active.success && (
		            <>
		             
		              <p>
		                *{active.message}
		              </p>
		            </>
		          )}
			</div>
			<Form onSubmit={handleSubmit} className="rs-form w-50">
		<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
			<Form.Label className="title fs-5">Địa chỉ Email</Form.Label>
			<Form.Control
				required 
				name="email" 
				type="email" 
				style={{height:55}} 
				onChange={onChangeNewPostForm} 
				onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('Email bạn nhập chưa chính xác!')}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('')}
			/>
		</Form.Group>
		<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
			<Form.Label className="title fs-5">Mật khẩu</Form.Label>
			<Form.Control 
				required 
				name="password" 
				type="password" 
				pattern="[a-zA-Z0-9. @]{6,}"
				style={{height:55}} 
				onChange={onChangeNewPostForm} 
				onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('Mật khẩu không đúng định dạng. Sử dụng ít nhất 6 ký tự và chỉ chấp nhận chữ, số, dấu chấm và khoảng trắng.')}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('')}
			/>
		</Form.Group>
		      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
		        <Form.Label className="title fs-5">Nhập lại mật khẩu</Form.Label>
		        <Form.Control 
			        required 
			        name="rePassword" 
			        type="password" 
			        pattern="[a-zA-Z0-9. @]{6,}"
			        style={{height:55}}
			        onInvalid={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('Nhập lại mật khẩu chưa chính xác!')}
			        onInput={(e: React.ChangeEvent<HTMLInputElement>) => (e.target as HTMLInputElement).setCustomValidity('')}
		        />
		      </Form.Group>
		      <Form.Group style={{height:70}} className="d-flex align-items-center mb-3">
		      	<Link onClick={()=>props.param("login")} href="tai-khoan?login" className="w-75 text-wash custom-link title">đăng nhập</Link>
		        <Button 
		        	className="btn btn-wash text-white fw-bold"
		        	type="submit"
		        	style={{
		        		width:150,
		        		height: 50
		        	}}
		        >
		        	Register
		        </Button>
		      </Form.Group>
		    </Form>
		</div>
	)
}

export default LoginForm;