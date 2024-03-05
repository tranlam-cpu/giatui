import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//collected ------------------------------------------------
export const getDatetimeCollected = createAsyncThunk('Datetimes/datetimeCollectedFetched',async()=>{

	const response =await axios.get('/api/collected')
	// const response= [
	//     { 'id': 1, start: '10:00 AM', end: '12:00 PM', daytime: 'Morning' },
	//     { 'id': 2, start: '12:00 PM', end: '2:00 PM', daytime: 'Afternoon' },
	//     { 'id': 3, start: '2:00 PM', end: '4:00 PM', daytime: 'Afternoon' },
	//     { 'id': 4, start: '4:00 PM', end: '6:00 PM', daytime: 'Afternoon' },
	//     { 'id': 5, start: '6:00 PM', end: '8:00 PM', daytime: 'Evening' },
	   
	// ];
	return response.data
})

export const getCollecteds= createAsyncThunk('Datetimes/collectedsFetched',async()=>{
	const response =await axios.get('/api/collected/admin')
	return response.data
})

export const createDatetimeCollected = createAsyncThunk('Datetimes/datetimeCollectedCreated',async (data:any)=>{
	const response=await axios.post('/api/collected',data)
	
	return response.data;
	
})


//delivery ------------------------------------------------
export const getDatetimeDelivery = createAsyncThunk('Datetimes/datetimeDeliveryFetched',()=>{

	const datetimes= [
	    { 'id': 1, start: '10:00 AM', end: '12:00 PM', daytime: 'Morning' },
	    { 'id': 2, start: '12:00 PM', end: '2:00 PM', daytime: 'Morning' },
	    { 'id': 3, start: '2:00 PM', end: '4:00 PM', daytime: 'Afternoon' },
	    { 'id': 4, start: '4:00 PM', end: '6:00 PM', daytime: 'Afternoon' },
	    { 'id': 5, start: '6:00 PM', end: '8:00 PM', daytime: 'Evening' },
	   
	];
	return datetimes
})


const datetimeSlice = createSlice({
	name: 'datetimes',
	initialState:{
		collectedsAdmin:[],
		DatetimeCollected:[],
		DatetimeDelivery:[],
		collected:{
			'full_day_name':'',
			'time':''
		},
		delivery:{
			'full_day_name':'',
			'time':''
		},
	},
	reducers:{
		collectionDay(state,action){
			state.collected=action.payload
		},
		deliveryDay(state,action){
			state.delivery=action.payload
		},
	},
	extraReducers: (builder)=>{
		//GET datetime
		//chay di lay data
		builder
		// .addCase(getDatetimes.pending,(state,action)=>{
		// 	console.log('fetching datetime from backend ...')
		// })
		//thanh cong
		.addCase(getDatetimeCollected.fulfilled,(state,action)=>{

			try {
				
				const temp: any[] = [];
				const times=action.payload.collecteds;
			    times?.forEach((time:any) => {
			        if (!temp[time.daytime]) {
			          temp[time.daytime] = [time];
			        } else {
			          temp[time.daytime].push(time);
			        }
			    });
				
			    (state.DatetimeCollected as any)=temp;
			}catch(error){
				console.log(error)
			}
			
			// state.allDatetimes=action.payload
		})

		.addCase(getDatetimeDelivery.fulfilled,(state,action)=>{

			try {
				const temp: any[] = [];
				const times=action.payload;
			    times?.forEach((time:any) => {
			        if (!temp[time.daytime]) {
			          temp[time.daytime] = [time];
			        } else {
			          temp[time.daytime].push(time);
			        }
			    });

			    (state.DatetimeDelivery as any)=temp;
			   
			}catch(error){
				console.log(error)
			}
			
			// state.allDatetimes=action.payload
		})
		.addCase(getCollecteds.fulfilled,(state,action)=>{
			
			state.collectedsAdmin=action.payload.collecteds
		})
		.addCase(createDatetimeCollected.fulfilled,(state,action)=>{
			const data=state.collectedsAdmin.filter((item:any)=>item.daytimeId===action.payload.collected.daytimeId)

			const newdata={...action.payload.collected,daytimeName:(data[0] as any).daytimeName,daytimeImage:(data[0] as any).daytimeImage}
			state.collectedsAdmin.unshift(newdata as never)
		})
		//that bai
		// .addDefaultCase(getDatetimes.rejected,(state,action)=>{
		// 	console.log('Fail datetime from backend ...')
		// })
	}
})


//reducer

const datetimesReducer = datetimeSlice.reducer

// selector (lay ben index.js)
export const datimeCollectedSelector = (state:any) => state.datetimes.DatetimeCollected
export const datimeDeliverySelector = (state:any) => state.datetimes.DatetimeDelivery
export const collectedSelector = (state:any) => state.datetimes.collected
export const deliverySelector = (state:any) => state.datetimes.delivery
export const collectedsAdminSelector = (state:any) => state.datetimes.collectedsAdmin

export const {  collectionDay, deliveryDay } = datetimeSlice.actions

export default datetimesReducer