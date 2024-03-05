'use client'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authenticate } from '../../app/lib/action';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link'
const LoginForm=()=>{

	const [code, action] = useFormState(authenticate, undefined);

	return(
		<div className="login-page">
			<div className="login-form d-flex flex-column align-items-center">
				<div className="logo my-10">
					<img src="/images/logo.png" width="100"/>
				</div>
				<div className="title mb-2">
					<p>GIẶT ỦI TIỆN LỢI</p>
				</div>
				<div className="text-center fw-bolder text-danger">
					  {code === 'CredentialSignin' && (
			            <>       
			              <p>
			                Invalid credentials
			              </p>
			            </>
			          )}
				</div>
				<div className="w-100 px-5">
					<Form action={action}>
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
						        value="ADMIN"
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
					        <Button 
					        	className="btn btn-wash text-white fw-bold"
					        	type="submit"
					        	style={{
					        		width:'100%',
					        		height: 50
					        	}}
					        >
					        	đăng nhập
					        </Button>
					    </Form.Group>
				    </Form>
				</div>
			</div>
		</div>
	)
}


export default LoginForm