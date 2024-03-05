'use client'
import React,  { memo, useState,useEffect,useRef	 } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../public/styles/Modal.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useSelector, useDispatch } from 'react-redux'
import { collectionDay, deliveryDay } from '../store/reducers/DatetimeSlices'

const CollectedModal=(props:any)=>{
	
	const dispatch = useDispatch();	

    //renderDays
	const [arrayDates,setArrayDates]=useState<{date: number; day_name: string | undefined; full_day_name: string | undefined}[]>([]);


	//select dates
	const [radioDates,setRadioDates]=useState("");

	//select times
	const [radioTime,setRadioTime]=useState("");

	//constructor collected
	const [collected,setCollected]=useState({full_day_name:"",time:""})

	// support collected run one times on constructor
	const [dispatched, setDispatched] = useState(false);


	
	// Object.filter = (obj:any, predicate:any) => 
    // Object.keys(obj)
    //       .filter( key => predicate(obj[key]) )
    //       .reduce( (res, key) => {
    //       	const temp=obj[key].filter((value:any)=>{
    //       		let string=`${value.start} - ${value.end}`;
	// 		   	return string===props.statemodelbutton.time
    //       	})
    //       	res=temp[0];
    //       	return res
    //       }, {} );

	function filterObject(obj:any, predicate:any, props:any) {
		return Object.keys(obj)
		  .filter(key => predicate(obj[key]))
		  .reduce((res, key) => {
			const temp = obj[key].filter((value:any) => {
			  let string = `${value.start} - ${value.end}`;
			  return string === props.statemodelbutton.time;
			});
			res=temp[0];
           	return res
		  }, {});
	  }

	function reRenderDateTime(){

		   	const filter=filterObject(props.times, (score:any)=>{
			   	const a= score.filter((value:any)=>{
			   		let string=`${value.start} - ${value.end}`;
			   		return string===props.statemodelbutton.time
			   	})
			 	
			   if(a.length>0) return a
			   },props)
		   	

		  
		   	const filterdate=arrayDates.filter((value)=>{
		   		return value.full_day_name === props.statemodelbutton.full_day_name
		   	})

		   	setRadioDates(JSON.stringify(filterdate[0]))
		    setRadioTime(JSON.stringify(filter))
	   
	}
	
	function isEmpty(obj:any) {
	  for (const prop in obj) {
	    if (Object.hasOwn(obj, prop)) {
	      return false;
	    }
	  }

	  return true;
	}

	function renderTimes() {
		// get first time 
	  !isEmpty(props.times) && setRadioTime(JSON.stringify(Object.values<any>(props.times)[0][0]))
	   
	}

	

	//khong cho useeffect call 2 time
	const initialized = useRef(false);
	// if (!initialized.current) {
	function getCurrentDate(newDate: Date){
		
		
		let current_day=newDate.getDay();
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		let day_name;
		switch (current_day) {
		case 0:
		    day_name = "CN";
		    break;
		case 1:
		    day_name = "Th 2";
		    break;
		case 2:
		    day_name = "Th 3";
		    break;
		case 3:
		    day_name = "Th 4";
		    break;
		case 4:
		    day_name = "Th 5";
		    break;
		case 5:
		    day_name = "Th 6";
		    break;
		case 6:
		    day_name = "Th 7";
		}

		let full_day_name=`${day_name}, ${date} thg ${month<10?`0${month}`:`${month}`} ${year}`;
		let object={
			'full_day_name': full_day_name,
			'day_name': day_name,
			'date': date
		}
		return object
	}

	const renderDates=(today: Date)=>{
		
		const newDates: {full_day_name: string | undefined; day_name: string | undefined; date: number}[] = [];
		
		newDates.push(getCurrentDate(today))

		const rdo_today=getCurrentDate(today)
		setRadioDates(JSON.stringify(rdo_today))

		for(let i=1;i<5;i++){
			let tomorrow =new Date();
			tomorrow.setDate(today.getDate()+i)
			newDates.push(getCurrentDate(tomorrow));
		}
		
		
		
		setArrayDates(newDates);
	}



	const renderCollected=()=>{
		
		if(radioDates && radioTime){
		
			const collected={
				"full_day_name":JSON.parse(radioDates).full_day_name,
				"time":`${JSON.parse(radioTime).start} - ${JSON.parse(radioTime).end}`
			}

			setCollected(collected)
			
		}
		
	}


	
	//get name json
	// console.log(Object.keys(arrayTimes)[0])

	const handleButton=()=>{
		if(props.titlename==="collected"){
			dispatch(collectionDay(collected))
		}else{
			dispatch(deliveryDay(collected))		
		}
		
		props.onHide()
	}

	useEffect(()=>{
		
		if(dispatched){
			reRenderDateTime()
		}
		
	},[props.titlename])

	const [check,isCheck]=useState(true)
	useEffect(() => {
				
        if (!initialized.current && check) {
            let today = new Date();
            // await dispatch(getDatetimes());
            renderDates(today);
            renderTimes();
            dispatch(collectionDay(collected))
            dispatch(deliveryDay(collected))
            if(!isEmpty(props.times)) isCheck(false)
            
        }
	    
	}, [props.times]);

	

	useEffect(() => {

		renderCollected()
	},[radioTime,radioDates])
	
	useEffect(() => {
		if (collected.full_day_name !== "" && !dispatched) {
		
			dispatch(collectionDay(collected));
			dispatch(deliveryDay(collected));
			setDispatched(true);
		}
		  
	},[collected,dispatched])

	return(
		<Modal
	      {...props}
	      aria-labelledby="contained-modal-title-vcenter"
	      centered
	    >
		
		    <Modal.Body style={{
		      maxHeight: 'calc(100vh - 160px)',
		      overflowY: 'auto'
		     }}>
		        {radioDates && (<h5 className="fw-bolder mb-3">{props.titlename} {JSON.parse(radioDates).date===arrayDates[0].date?"Today": ""} ({JSON.parse(radioDates).full_day_name})</h5>)}
		        <ButtonToolbar aria-label="Toolbar with button groups">
		        	<ButtonGroup className="w-100" aria-label="First group">
				    	{arrayDates.map((radio, idx) => (
				    		<ToggleButton
				    			className={`${radioDates==JSON.stringify(radio) ? "btn-selected" : ""} bg-light fw-bolder text-wash`}
   								variant="primary"
					            key={`radio-dates-${idx}`}
					            id={`radio-dates-${idx}`}
					            type="radio"
					            checked={radioDates==JSON.stringify(radio)}
					            value={JSON.stringify(radio)}
					            onChange={(e) => setRadioDates(e.currentTarget.value)}
					        >
					            {radio.day_name} <br/>
					            {radio.date}
					        </ToggleButton>
				    	))}
				    </ButtonGroup>
		        </ButtonToolbar>
		        {props.times && Object.values(props.times).map((radio, idx)=> (
		        <div key={`btn-times-${idx}`}>
	        		<h5  className="fw-bolder my-3 fs-6">{Object.keys(props.times)[idx]}</h5>
	        		<div className="btn-times" aria-label="Second group">
	        			{radio instanceof Array && radio.map((value:any,id:any)=>(	
				    		<ToggleButton
				    			className={`${JSON.stringify(value)===radioTime ? "btn-selected" : ""} bg-light fw-bolder text-wash`}
				    			variant="primary"
				    			key={`radio-times-${value.id}`}
				    			id={`radio-times-${value.id}`}
   								type="radio"
   								checked={JSON.stringify(value)===radioTime}
   								value={JSON.stringify(value)}
   								onChange={(e) => setRadioTime(e.currentTarget.value)} 
					        >
					            {value.start} <br/> - <br/> {value.end}
					        </ToggleButton>
					    ))} 	
				    </div>		
		        </div>  
		        ))}      
		    </Modal.Body>
	        <Modal.Footer>
	        	<Button 
					className="btn-save w-100 text-white py-3 bg-success bg-opacity-75"
					onClick={handleButton}
				>
					Save
				</Button>
	        </Modal.Footer>
    	</Modal>
	)
}



export default memo(CollectedModal)