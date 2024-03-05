'use client'
import './home.css'
import '../../../index.scss'
import TableCommon  from '../../../../components/backend/table-common'
import { useDispatch, useSelector } from 'react-redux'
import { collectedsAdminSelector, getCollecteds } from '@/store/reducers/DatetimeSlices'
import { useEffect } from 'react'

const Collected=()=>{

	//dispatch redux
	const dispatch = useDispatch();

	//get redux users array

    const datetimes=useSelector(collectedsAdminSelector)
	
	
	// const datetimes= [
	//     { 'id': 1, start: '10:00 AM', end: '12:00 PM', daytime: 'Morning' },
	//     { 'id': 2, start: '12:00 PM', end: '2:00 PM', daytime: 'Afternoon' },
	//     { 'id': 3, start: '2:00 PM', end: '4:00 PM', daytime: 'Afternoon' },
	//     { 'id': 4, start: '4:00 PM', end: '6:00 PM', daytime: 'Afternoon' },
	//     { 'id': 5, start: '6:00 PM', end: '8:00 PM', daytime: 'Evening' },
	   
	// ];

	const header=true;
    const footer = `Hiện có ${datetimes ? datetimes.length : 0} nội dung.`;

    const title={
    	'id': 'Id',
    	'start': 'Bắt đầu thu',
    	'end': 'Kết thúc thu',
    	'active': 'Trạng thái',
		'daytimeId': 'Id thời gian trong ngày',
		'daytimeName': 'Thời gian trong ngày',
		'daytimeImage': 'Hình ảnh'
    }



	useEffect(()=>{
		dispatch<any>(getCollecteds())
		
	},[]);


	return(
		<section>
			<TableCommon
				values={datetimes}
				header={header}
				footer={footer}
				th={title}
			/>
		</section>
	)
}

export default Collected