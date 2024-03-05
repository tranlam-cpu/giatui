'use client'
import React, { useState , useEffect  } from "react";
import emoji from "react-emoji-render";
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import '../../public/styles/emoji.css'
import Button from 'react-bootstrap/Button';

const Contact=()=>{
	
	const [inputStr, setInputStr] = useState("");
	const [showPicker,setShowPicker] = useState(false);
	const [inputForcus, setInputForcus] =useState(false);

	const onEmojiClick =(event:any)=>{	
		setInputStr(prevInput=> prevInput + event.emoji);
		setShowPicker(false);
	}

	const onSendClick =(event:any)=>{
		event.preventDefault();
		setInputStr("");
	}

	useEffect(() => {
        document.body.addEventListener('click', (event:any)=>{
        	if(event.target.tagName !=="svg" || event.target.tagName !=="IMG"){
        		setInputForcus(false)
        		setShowPicker(false);
        	}
        	
        } );

    },[]);
	

	return(
		<section className="pt-5 my-5">
			<h2 className="text-center">Khách hàng đánh giá về dịch vụ</h2>
			<hr className="mb-5"/>
			<div className="picker-container">
				<textarea
					placeholder="để lại lời nhắn của bạn.."
					className={`input-style ${inputForcus ? "input-style-focus" : ""}  ${showPicker ? "input-emoji-click" : ""}`}
					value={inputStr}
					onClick={()=>setInputForcus(true)}
					onChange={e=> setInputStr(e.target.value)}
				/>

				<BsEmojiSmile
					className={`emoji-icon ${inputForcus ? "" : "hidden-contact"}`}
					onClick={()=>setShowPicker(val => !val)}
				/>

				<Button 
					onClick={()=>onSendClick(event)}
					variant="wash" 
					className={`text-white button-contact ${inputForcus ? "" : "hidden-contact"}`}
				>gửi</Button>

				{showPicker && <Picker
					width="100%"
					onEmojiClick={onEmojiClick} 
				/>}
			</div>
		</section>
	)
}


export default Contact;