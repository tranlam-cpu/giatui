'use client'
import React ,{useState ,useEffect}  from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const Login=()=>{

	const [stateParam,setStateParam]=useState("login")
	
	const getUrl=()=>{
		const query = new URLSearchParams(window.location.search);
		const register=query.has('register')
		if(register){
			setStateParam('register')
		}else{
			setStateParam('login')
		}
	}

	useEffect(()=>{
		getUrl()
	},[])	
	

	let renderForm;

	if(stateParam==="login"){
		renderForm=<LoginForm param={setStateParam}></LoginForm>
	}else{
		renderForm=<RegisterForm param={setStateParam}></RegisterForm>
	}


	return(
		<section className="mt-7">
			<div className="py-5 text-center title">
				<h1>{stateParam==="login" ? "Đăng Nhập" : "Đăng ký"}</h1>
			</div>
			{renderForm}
			
		</section>
	)
}

export default Login