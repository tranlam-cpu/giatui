'use client'


import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { getDaytimes, daytimesSelector } from '../../store/reducers/DaytimeSlices'
import { createDatetimeCollected } from "@/store/reducers/DatetimeSlices";
const CreateCollectedForm = ({toast, onHide}: {toast: any, onHide: any}) => {
    //state time
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
  
    //dispatch redux
	const dispatch = useDispatch();

    //const error
    const [stateError, setStateError] = useState({
        time: false,
        daytimes: false
    })

    const daytimes=useSelector(daytimesSelector)

    useEffect(() => {
        dispatch<any>(getDaytimes());
    }, [dispatch]);

    //-------------------
    

    const selectedDaytimesTemplate = (daytimes:any, props:any) => {
        if (daytimes) {
            return (
                <div className="d-flex align-items-center p-0">
                    <img alt={daytimes.name} src={daytimes.image} className="me-2" style={{ width: '18px' }} />
                    <div className="p-0">{daytimes.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const DaytimesOptionTemplate = (daytimes:any) => {
        return (
            <div className="d-flex align-items-center p-3">
                <img alt={daytimes.name} src={daytimes.image} className="me-2" style={{ width: '18px' }} />
                <div className="p-0">{daytimes.name}</div>
            </div>
        );
    };

    const convertTo12Hour = (time:Date) => {
        // Get the hour in 12-hour format (0-11)
        const hour12 = time.getHours() % 12;

        // Get minutes
        const minutes = time.getMinutes();

        // Get AM/PM based on the hour
        const meridiem = time.getHours() >= 12 ? "PM" : "AM";

        // Format the time string (e.g., 3:15 PM)
        const timeString = `${hour12 !== 0 ? hour12 : 12}:${minutes.toString().padStart(2, "0")} ${meridiem}`;

        return timeString;
    }

    const handleSubmit=(e:any)=>{
       e.preventDefault();
      
       if(timeStart===null || timeEnd===null){
        setStateError({...stateError,time:true})
        return false
       }

       const start=new Date(timeStart as any)
       const end=new Date(timeEnd as any);
       if(selectedDaytimes===null){
        setStateError({...stateError,daytimes:true})
        return false
       }
       
       if(start>end){
        setStateError({...stateError,time:true})
        return false
       }

       const ts = convertTo12Hour(start);
       const te = convertTo12Hour(end);
       
       //reset error
       setStateError( {...stateError,daytimes:false,time:false})

       const data={
              start:ts,
              end:te,
              daytimeId:(selectedDaytimes as any).id
       }
       dispatch<any>(createDatetimeCollected(data))
       .then((res:any)=>{
       
            if(res.payload===undefined){       
                (toast.current as any)?.show({ severity: 'danger', summary: 'Created', detail: 'Thêm dữ liệu thất bại!', life: 3000 })  
            }else{
                
                (toast.current as any)?.show({ severity: 'info', summary: 'Created', detail: 'Thêm dữ liệu thành công!', life: 3000 })
                onHide(false)
            }
        }).catch((err:any)=>{
            (toast.current as any)?.show({ severity: 'danger', summary: 'Created', detail: 'Lỗi chưa xác định!', life: 3000 })
        })
    }

    const [selectedDaytimes, setSelectedDaytimes] = useState(null);
    

    return (
        <Container className="py-0">
            <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-item-center">
                <div className="d-flex flex-row justify-content-evenly align-items-center">
                    <div className="text-center">
                        <label>Thời gian bắt đầu thu thập</label> <br/>
                        <Calendar 
                            value={timeStart} 
                            onChange={(e:any) => setTimeStart(e.value)} 
                            timeOnly
                            hourFormat="12"
                            />
                    </div>

                    <div className="text-center">
                        <label>Thời gian kết thúc thu thập</label> <br/>
                        <Calendar 
                            value={timeEnd} 
                            onChange={(e:any) => setTimeEnd(e.value)} 
                            timeOnly     
                            hourFormat="12" 
                            className={`${stateError.time ? "p-invalid" : ""}`}
                        />
                    </div>

                    <div className="text-center pt-3">
                        <label>Thời gian trong ngày</label> <br/>
                        <Dropdown 
                            value={selectedDaytimes} 
                            onChange={(e) => setSelectedDaytimes(e.value)} 
                            options={daytimes} 
                            optionLabel="name" 
                            placeholder="Select a Daytimes" 
                            filter valueTemplate={selectedDaytimesTemplate} 
                            itemTemplate={DaytimesOptionTemplate} 
                            className={`w-100 ${stateError.daytimes ? "p-invalid" : ""}`} />
                    </div>

                </div>
                {stateError.daytimes || stateError.time ? <div className="pt-0 text-center text-danger">*Thời gian nhập vào không chính xác!</div> : ""}
                <Button className="py-2" type="submit" label="Thêm"/>
            </Form>
        </Container>
    )
}

export default CreateCollectedForm