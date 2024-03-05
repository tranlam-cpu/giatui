'use client'
import React,  { useCallback, useState,useEffect,useMemo } from 'react'
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CollectedModal from './CollectedModal';
import InputSpinner from './InputSpinner';
import { useSelector, useDispatch } from 'react-redux'
import { datimeCollectedSelector, datimeDeliverySelector, getDatetimeCollected, getDatetimeDelivery , collectedSelector, deliverySelector } from '../store/reducers/DatetimeSlices'
import {getService, getCollected, getDelivery ,allServiceSelector, allCollectedSelector, allDeliverySelector } from '../store/reducers/CollectionSlices'
import { Waypoint } from 'react-waypoint';
import { FaMoneyBill } from "react-icons/fa";
import { BiSolidBank } from "react-icons/bi";
import { createSelector } from 'reselect';
import Congratulation from './congratulation';

const Orders=()=>{

	//congratulation
	const [congratulationState,setCongratulationState]=useState(false)


	// choose services
	const [radioValue, setRadioValue] = useState('');

	//choose colection - delivery
	const [radioCollectionValue, setRadioCollectionValue] = useState('');
	const [radioDeliveryValue, setRadioDeliveryValue] = useState('');
	
	
	
	//checked payment
	const [payment, setPayment] = useState("1");

	//checked collection - delivery
	const [checkCollection,setCheckCollection]= useState(false);
	const [checkDelivery,setCheckDelivery]= useState(false);


	//checked shoes modal - extra special 
	const [ShoesModalShow, setShoesModalShow] = useState(false);
	const [SpecialModalShow, setSpecialModalShow] = useState(false);

	//choose model collected - datetime
	const [collectedModalShow, setCollectedModalShow] = useState(false);
	



	//dispatch redux
	const dispatch = useDispatch();


	//get redux times array
	const timeCollected = useSelector(datimeCollectedSelector)
	const timeDelivery = useSelector(datimeDeliverySelector)
	

	//get collection - delivery - service content choose

	const radios_collections = useSelector(allCollectedSelector)
	const radios_deliveries = useSelector(allDeliverySelector)
	const radios_service = useSelector(allServiceSelector)

	
	


	//get collection - delivery day
	const collected = useSelector(collectedSelector)
	const delivery = useSelector(deliverySelector)


	

	



	//collected - delivery button
	const [buttonStatus,setButtonStatus]=useState("");

	//bill status
	const [bill,setBill]=useState(false)

	//bill bottom status
	const [billBottom,setBillBottom]=useState(false)

	//error alert
	const [error,setError]=useState(false)


	//validate datetime
	const isDateTime1BeforeDateTime2=(dateTime1:any, dateTime2:any) => {
	  const parseDateTime = (dateTime:any) => {
	    const dateComponents = dateTime.full_day_name.split(' ');
	    const day = parseInt(dateComponents[2]);
	    const month = parseInt(dateComponents[4]); 
	    const year = parseInt(dateComponents[5]);

	    const [startTime, endTime] = dateTime.time.split(' - ');

	  
	    const dateTimeString = `${month}/${day}/${year} ${startTime}`;
    
	    
	    return new Date(dateTimeString);
	  };

	  const date1 = parseDateTime(dateTime1);
	  const date2 = parseDateTime(dateTime2);
	  
	  return date1 < date2;
	}

	


	// validate form
	

	const handleSubmit = (event:any) => {
		event.preventDefault();
	 	if (!isDateTime1BeforeDateTime2(collected,delivery)){
	 		setError(true)
	      	window.scrollTo(0, 0)
	 	}

		return new Promise((resolve, reject) => {
			setCongratulationState(true)
				setTimeout(() => {
					setCongratulationState(false)
					resolve("");
				}, 3000);		
			
		});
	};




	

	// unit (kg)
	const [unitValue, setUnitValue] = useState(1);
	
	const handleIncrement = useCallback((e:any) => {
	  	e.preventDefault();
	    setUnitValue(unitValue + 1)
	},[unitValue])

	const handleDecrement = useCallback((e:any) => {
	  	e.preventDefault();
	    setUnitValue(unitValue - 1)
	},[unitValue])
	//

	//shoes unit
	const [unitShoesValue, setUnitShoesValue] = useState(1);

	const handleShoesIncrement = useCallback((e:any) => {
	  	e.preventDefault();
	    setUnitShoesValue(unitShoesValue + 1)
	},[unitShoesValue])

	const handleShoesDecrement = useCallback((e:any) => {
	  	e.preventDefault();
	    setUnitShoesValue(unitShoesValue - 1)
	},[unitShoesValue])



	//render input
	const renderInputRadio= ()=>{
		if(radios_collections && radios_deliveries){
			const service=radios_service[0]
			const collection=radios_collections[0]
			const deliveres=radios_deliveries[0]
			setRadioValue(JSON.stringify(service))
			setRadioCollectionValue(JSON.stringify(collection))
			setRadioDeliveryValue(JSON.stringify(deliveres))
		}	
	

	}
	

	

	//dispatch data

	useEffect(()=>{
		dispatch(getCollected() as any);
	
	},[dispatch])


	useEffect(()=>{
		dispatch(getDelivery() as any);
	
	},[dispatch])


	useEffect(()=>{
    
	    dispatch(getService() as any);
	  	
	},[dispatch])

	useEffect(()=>{
    
	    dispatch(getDatetimeCollected() as any);
	  	
	},[dispatch])

	useEffect(()=>{
    
	    dispatch(getDatetimeDelivery() as any);
	  	
	},[dispatch])





	
	useEffect( ()=>{
		if (radios_collections && radios_deliveries) {
	        renderInputRadio();     
	    }
	    

	},[radios_collections,radios_deliveries])



	

	const handleButton=(value:any)=>{
		if(value==="collected"){
			setButtonStatus("collected")
		}else{
			setButtonStatus("delivery")
		}
		setCollectedModalShow(true)
		
	}
	const onHideModal = useCallback(() => {
		
	    setCollectedModalShow(false);

	   	if(buttonStatus==="collected"){
	   		setButtonStatus("delivery")
	   	}else{
	   		setButtonStatus("collected")
	   	}
	    
	  }, [buttonStatus]);
	
	
	
	//waypoint top
	const handleWaypointEnter = (e:any) => {
		//disable bottom
		if(e.currentPosition==="inside" && e.previousPosition==="below"){
			
		}else{
	    	setBill(false)
		}			    
	}

	const handleWaypointLeave = (e:any) => {
	
		if(e.currentPosition==="below" && e.previousPosition==="inside"){
		}else{
	    	setBill(true)
	    	
		}	    
	}

	//waypoint bottom
	const handleWaypointBottomEnter = (e:any) => {
		
		setBill(false)
		setBillBottom(true)
	}

	const handleWaypointBottomLeave = (e:any) => {

		setBill(true)
		setBillBottom(false)
	}

	useEffect(() => {
		const resizeBillSticky = () => {
		const parentWidth = document.querySelector('.bill-parent')?.clientWidth;
		const billSticky = document.querySelector('.bill') as HTMLElement;
		if(billSticky && parentWidth){
			billSticky.style.width = parentWidth-1 + 'px';
		}
			
	};

    if (bill) {

		resizeBillSticky(); 
		window.addEventListener('resize', resizeBillSticky);
		} else {
	
		window.removeEventListener('resize', resizeBillSticky);
		}

		return () => {
		window.removeEventListener('resize', resizeBillSticky);
		};
	}, [bill]);

	//error alert
	useEffect(() => {
		let timerId:any;
		if (error) {
		  timerId = setTimeout(() => {
			setError(false);
		  }, 6000);
		}
	  
		// Clean up function
		return () => {
		  if (timerId) {
			clearTimeout(timerId);
		  }
		};
	  }, [error]);

	return(
		<section className="mt-7">
			{ congratulationState && <Congratulation />}
			<CollectedModal
		        show={collectedModalShow}
		        onHide={onHideModal}
		        titlename={buttonStatus}
		       	times={buttonStatus==="collected" ? timeCollected : timeDelivery}
		       	statemodelbutton={buttonStatus==="collected"? collected : delivery}
		  />
			<Alert show={error} className="text-center fw-bolder text-danger alert-error">Thời gian thu thập và giao hàng có vẻ như không chính xác!</Alert>
			

	     	<Waypoint
	     	//   className="d-none"
	          onEnter={(e)=>handleWaypointEnter(e)}
	          onLeave={(e)=>handleWaypointLeave(e)} 
	          topOffset="64px"
	          
	        />
			<div className="my-4">
				<Form onSubmit={handleSubmit}>
					<div>
						<Row>
							<Col md={8}>
								<ol type="1" className="w-100 m-0 p-0">
									<div className="mb-4">
										<h3 className="fw-bolder fs-4 ms-4 mb-4"><li>Chọn dịch vụ của bạn</li></h3>
										<div className="card border p-4">
											<ButtonGroup
												className="d-flex flex-column"
											>
										        {radios_service?.map((radio:any, idx:any) => (
										          <ToggleButton
										          	className={`${radioValue === JSON.stringify(radio) ? "active selected" : "option-selected"} d-flex align-items-center p-4 mb-3`}
										          	variant="outline"
										            key={idx}
										            id={`radio-${idx}`}
										            type="radio"
										            value={JSON.stringify(radio)}
										            checked={radioValue === JSON.stringify(radio)}
										            onChange={(e) => setRadioValue(e.currentTarget.value)}
										          >
										          	<div className="float-start w-75 d-flex flex-column text-start">
										          		<span className="fa-custom align-middle"><span className="fs-4">{radio.name}</span></span>
										          		<span className="fa-custom align-middle text-muted">{radio.description}</span>
										          	</div>
										          	<div className="float-end w-25">
										          		<span className="fa-custom align-middle"><span className="fs-4 text-wash">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(radio.price)}</span> / kg</span>
										          	</div>
									        		
										          </ToggleButton>
										        ))}
										    </ButtonGroup>
									    </div>
									</div>
									
									<div className="mb-4">
										<h3 className="fw-bolder fs-4 ms-4 mb-4"><li>Chọn thời gian nhận hàng và giao hàng của bạn</li></h3>
										<div className="card border p-4">		
											<Row>
												<Col>
													<Button 
														variant="outline-wash w-100 mb-3"
														onClick={()=>handleButton("collected")}
													>
														<div>
															<strong>Thu thập</strong>
															<br/>
															{!collected ? "loadding.." :"" }
															{collected && collected.full_day_name}
															<br/>
															{collected && collected.time}
														</div>
													</Button>
													{radios_collections?.map((radio:any,idx:any)=>(
														<Form.Check
															className="mb-3"
															key={`colection-${idx}`}
															id={`colection-${idx}`}
															checked={JSON.stringify(radio) === radioCollectionValue}
															value={JSON.stringify(radio)}
												            type='radio'
												            label={`${radio.name}`}
												            onChange={(e) => setRadioCollectionValue(e.currentTarget.value)}
												        />
													))}
														<Form.Check
															className="mb-3"
													        type="switch"       
													        label="Tôi có hướng dẫn để thu thập"
													        onChange={(e) => setCheckCollection(e.currentTarget.checked)}
													    />
													    <Alert show={checkCollection} className="text-center border p-3">
													    	<label htmlFor="area-collection" className="text-start text-muted">
													    		Nếu bạn có bất kỳ hướng dẫn đặc biệt nào để thu thập, vui lòng cho chúng tôi biết bên dưới.
													    	</label>
													    	<textarea id="area-collection" className="border border-opacity-25 w-100 p-2" rows={6}>
													    	</textarea>
													    </Alert>
												</Col>
												<Col md>
													<Button 
														variant="outline-wash w-100 mb-3"
														onClick={()=>handleButton("delivery")}
													>
														<div>
															<strong>Giao hàng</strong>
															<br/>
															{!delivery ? "loadding.." :"" }
															{delivery && delivery.full_day_name}
															<br/>
															{delivery && delivery.time}
														</div>
													</Button>
													{ radios_deliveries?.map((radio:any,idx:any)=>(
														<Form.Check
															className="mb-3"
															key={`delivery-${idx}`}
															id={`delivery-${idx}`}
															checked={JSON.stringify(radio) === radioDeliveryValue}
															value={JSON.stringify(radio)}
												            type='radio'
												            label={`${radio.name}`}
												            onChange={(e) => setRadioDeliveryValue(e.currentTarget.value)}
												        />
													))}
														<Form.Check
															className="mb-3"
													        type="switch"       
													        label="tôi có hướng dẫn để giao hàng"
													        onChange={(e) => setCheckDelivery(e.currentTarget.checked)}
													    />
													    <Alert show={checkDelivery} className="text-center border p-3">
													    	<label htmlFor="area-delivery" className="text-start text-muted">
													    		Nếu bạn có bất kỳ hướng dẫn đặc biệt nào để thu thập, vui lòng cho chúng tôi biết bên dưới.
													    	</label>
													    	<textarea id="area-delivery" className="border border-opacity-25 w-100 p-2" rows={6}>
													    	</textarea>
													    </Alert>
												</Col>
											</Row>										
										</div>
									</div>

									<div className="mb-4">
										<h3 className="fw-bolder fs-4 ms-4 mb-4"><li>Khối lượng đồ giặt của bạn</li></h3>
										<div className="card border p-4">
											<div>
												<p>Xấp xỉ, đồ giặt của bạn nặng bao nhiêu?</p>
												<p>Đừng lo lắng về việc chính xác, chúng tôi sẽ cân nhắc mọi thứ cho bạn. Điều này chỉ để cung cấp cho bạn một ước tính về chi phí.</p>
											</div>
											<InputSpinner
												unitValue={unitValue}
												handleIncrement={handleIncrement}
											    handleDecrement={handleDecrement}
											    unit={"kg"}
											    min={1}
											    max={100}
											    w={80}
											>
											</InputSpinner>
											<h5 className="pt-5 fw-bolder">Dịch vụ bổ sung</h5>
											<div>
												<Form.Check
													className="mb-3"
											        type="switch"       
											        label="tôi có những đôi giày cần làm sạch."
											        onChange={(e) => setShoesModalShow(e.currentTarget.checked)}
											    />
											    <Alert show={ShoesModalShow} className="text-start border p-3">
											    	<label className="text-muted">
											    		bạn có bao nhiêu đôi giày?
											    	</label>
											    	<InputSpinner
													unitValue={unitShoesValue}
													handleIncrement={handleShoesIncrement}
												    handleDecrement={handleShoesDecrement}
												    unit={""}
												    min={1}
												    max={100}
												    w={60}
													>
													</InputSpinner>
											    </Alert>
											
												<Form.Check
													className="mb-3"
											        type="switch"       
											        label="Tôi có hướng dẫn đặc biệt cho đồ giặt của mình." 
											        onChange={(e) => setSpecialModalShow(e.currentTarget.checked)}
											    />
											    <Alert show={SpecialModalShow} className="text-start border p-3">
											    	<label htmlFor="area-caption-service" className="text-muted">
											    		Nếu đồ giặt của bạn cần thêm biện pháp xử lý đặc biệt, vui lòng cho chúng tôi biết bên dưới.
											    	</label>
											    	<textarea id="area-caption-service" className="border border-opacity-25 w-100 p-2" rows={6}>
													</textarea>
											    </Alert>
											</div>
									    </div>
									</div>

									<div className="mb-4">
										<h3 className="fw-bolder fs-4 ms-4 mb-4"><li>Chi tiết liên lạc</li></h3>
										<div className="card border p-4">
											<Form.Group className="mb-4" controlId="validationCustom01">
									          <Form.Label>Tên của bạn:</Form.Label>
									          <Form.Control
									            required
									            type="text"
									            style={{
									            	height:50
									            }}
									          />
									          <Form.Control.Feedback type="invalid">abc</Form.Control.Feedback>
									        </Form.Group>

									        <Form.Group className="mb-4" controlId="validationCustom02">
									          <Form.Label>Địa chỉ email của bạn:</Form.Label>
									          <Form.Control
									            required
									            type="email"
									            style={{
									            	height:50
									            }}
									            placeholder="ví dụ: lam@gmail.com"
									          />
									         
									        </Form.Group>


									        <Form.Group className="mb-4" controlId="validationCustom03">
									          <Form.Label>Số điện thoại:</Form.Label>
									          <Form.Control
									            required
									            type="number"
									            min="0"
									            style={{
									            	height:50
									            }}
									            placeholder="ví dụ: 0868672115"
									          />
									          
									        </Form.Group>

									        <Form.Group className="mb-4" controlId="validationCustom03">
									          <Form.Label>Địa chỉ giao nhận hàng:</Form.Label>
									          <textarea 
									            required
									          	className="border border-opacity-25 w-100 p-2" 
									          	rows={4}>
											  </textarea>
									          
									        </Form.Group>
										</div>
									</div>

									<div className="mb-4">
										<h3 className="fw-bolder fs-4 ms-4 mb-4"><li>Chọn phương thức thanh toán</li></h3>
										<div className="card border p-4">
											<div>
												<p>Không có gì phải trả cho đến khi đồ giặt của bạn đã được cân và xử lý trong cửa hàng của chúng tôi. Sau đó, bạn sẽ nhận được hóa đơn qua email với báo giá cuối cùng.</p>
											</div>
										
											<ButtonGroup
												className="d-flex flex-column"
											>
										       
										          <ToggleButton
										          	className={`${payment === "1" ? "selected-payment active" : "option-selected-payment"} text-start text-wash fw-bolder p-4 mb-3`}
										          	variant="outline"
										            key="pay-1"
										            id={`pay-1`}
										            type="radio"
										            value="1"
										            checked={payment === "1"}
										            onChange={(e)=>setPayment(e.currentTarget.value)}
										          >
										           	<BiSolidBank className="ms-3 mb-1 fs-5"/> Chuyển khoản ngân hàng
										          </ToggleButton>

										          <ToggleButton
										          	className={`${payment === "2" ? "selected-payment active" : "option-selected-payment"} text-start text-wash fw-bolder p-4 mb-3`}
										          	variant="outline"
										            key="pay-2"
										            id={`pay-2`}
										            type="radio"
										            value="2"
										            checked={payment === "2"}
										            onChange={(e)=>setPayment(e.currentTarget.value)}
										          >
										           	<FaMoneyBill className="ms-3 mb-1 fs-5"/> Tiền mặt khi giao hàng
										          </ToggleButton>
										      
										    </ButtonGroup>
											<hr className="text-wash"/>
											<div
												className="d-flex"
											>
												<input type="text" className="form-control w-25 me-3" />
	     										<Button  className="btn btn-wash text-white fw-bold" >Áp dụng giảm giá</Button>
											</div>
										</div>
									</div>

								</ol>
							</Col>
							
							<Col md className="position-relative">
								<div className="bill-parent">
									<div style={{
										height: 300
									}} className={`bill ${bill ? "bill-sticky" : ""} ${billBottom ? "bill-sticky-bottom" : ""} text-white card bg-wash px-3 py-3`} >
										<div>
											Đồ giặt của bạn sẽ được thu gom <b>({collected.full_day_name})</b> và được trả lại vào <b>({delivery.full_day_name})</b>.
										</div>
										
										<div className='mt-3'>
											<div className='float-start'>
												Trọng lượng ước tính:
											</div>
											<div className='float-end'>
												{unitValue} kg
											</div>
										</div>
										{/* cost of wash */}
										<div>
											<div className='float-start'>
												Chi phí giặt:
											</div>
											<div className='float-end'>
												{(unitValue*20000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
											</div>
										</div>
										{/* cost of shoues */}
										{ShoesModalShow && (
											<div>
												<div className='float-start'>
													Giày cần giặt:
												</div>
												<div className='float-end'>
													{unitShoesValue}
												</div>
											</div>
										)}
										


										<div>
											<div className='float-start'>
												Thu thập và giao hàng:
											</div>
											<div className='float-end'>
												<b>Free.</b>
											</div>
										</div>

										<div className='mt-3'>
											<div className='float-start pt-2'>
												Tổng cộng:
											</div>
											<div className='float-end'>

												
										
												<h2><b>{(unitValue*20000 + (ShoesModalShow ? unitShoesValue*40000 : 0)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b></h2>
											</div>
										</div>
									</div>
								</div>
							</Col>			
						</Row>
						<Waypoint
				     	//   className="d-none"
				          onEnter={(e)=>handleWaypointBottomEnter(e)}
				          onLeave={(e)=>handleWaypointBottomLeave(e)} 
				          bottomOffset="300px"			          
				        />
						<Row>
							<Col>
									<div className="card border my-4 p-4">
										<Button 
											style={{
												height:60
											}}  
											className="mb-4 btn btn-wash w-100 text-white fw-bold"
											type="submit" 
										>Đặt hàng</Button>
										<div className="rules">
											<p>Bằng cách đặt hàng, bạn đồng ý với các điều khoản dịch vụ của chúng tôi.</p>

											<p>Bằng cách đặt hàng, bạn xác nhận rằng tất cả các mặt hàng không có trong danh sách các mặt hàng chúng tôi không thể chấp nhận.</p>

											<p>Bằng cách đặt hàng, bạn đồng ý thông báo cho chúng tôi nếu bạn cần thay đổi thời gian giao hàng theo lịch trình của mình. Nếu chúng tôi không thể giao đơn đặt hàng của bạn.</p>
										</div>
									</div>		
							</Col>
						</Row>
					</div>
				</Form>
			</div>
			

			
		</section>
	)
}

export default Orders;