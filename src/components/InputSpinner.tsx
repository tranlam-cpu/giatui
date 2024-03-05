'use client'
import React,  { useState,useEffect } from 'react'

 
type InputSpinnerProps={
	unitValue: any
	handleIncrement:(e:any)=>void
	handleDecrement:(e:any)=>void
	unit:any
	min:any
	max:any
	w:any
	children?: React.ReactNode

}

const InputSpinner: React.FC<InputSpinnerProps> = ({unitValue,handleIncrement,handleDecrement,unit,min,max,w}) =>{

	

 
	return(
		<>
		<div style={{
			height:60
		}}>
	      <button style={{width:w}} disabled={unitValue===min ? true : false} className="h-100 btn btn-wash text-white fw-bold btn-buynow" onClick={(e:any)=>handleDecrement(e)}>-1{unit}</button>
	      <input type="text" value={`${unitValue}${unit}`} className="btn-rps h-100 fs-4 text-muted border border-0 text-center"  readOnly />
	      <button style={{width:w}} disabled={unitValue===max ? true : false} className="h-100 btn btn-wash text-white fw-bold btn-buynow" onClick={(e:any)=>handleIncrement(e)}>+1{unit}</button>
	    </div>
		</>
	)

}

export default InputSpinner