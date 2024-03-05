import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getCollected = createAsyncThunk('Collected/CollectionFetched',()=>{

	const Collected= [
	    { name: 'Thu thập từ lễ tân / an ninh', value: '1' },
	    { name: 'Thu thập từ bạn', value: '2' } 
	];
	return Collected
})

export const getDelivery = createAsyncThunk('Delivery/CollectionFetched',()=>{

	const Deliveries= [
	    { name: 'Giao hàng cho lễ tân / an ninh', value: '1' },
	    { name: 'giao hàng cho bạn', value: '2' } 
	];
	return Deliveries
})

export const getService = createAsyncThunk('Service/CollectionFetched',()=>{

	const Services= [
	    { name: 'Trả lại sau 48 giờ', id: '1', price: '50000',description:'' },
	    { name: 'Trả lại sau 24 giờ', id: '2', price: '100000',description:'' },
	    { name: 'Trả lại sau 6 giờ', id: '3', price: '200000',description:'Các đơn đặt hàng được thu thập trước 2:00 chiều sẽ được trả lại trong vòng 6 giờ. Nếu nhận hàng sau thời gian này, việc giao hàng sẽ diễn ra vào sáng hôm sau.'},
	];
	return Services
})

const collectionSlice = createSlice({
	name: 'collections',
	initialState:{
		allCollected: [],
		allDelivery: [],
		allService: [],
	},
	reducers:{
	},
	extraReducers: (builder)=>{
		//GET datetime
		//chay di lay data
		builder
		
		//thanh cong - collected
		.addCase(getCollected.fulfilled,(state,action)=>{

			try {
				(state.allCollected as any)=action.payload
			  
			}catch(error){
				console.log(error)
			}
			
			// state.allDatetimes=action.payload
		})

		//delivery
		.addCase(getDelivery.fulfilled,(state,action)=>{

			try {
				(state.allDelivery as any)=action.payload
			   
			}catch(error){
				console.log(error)
			}
			
			// state.allDatetimes=action.payload
		})

		//service
		.addCase(getService.fulfilled,(state,action)=>{

			try {
				(state.allService as any)=action.payload
			   
			}catch(error){
				console.log(error)
			}
			
			// state.allDatetimes=action.payload
		})
		
	}
})






//reducer

const collectionsReducer = collectionSlice.reducer

// selector (lay ben index.js)
export const allCollectedSelector = (state:any) => state.collections.allCollected
export const allDeliverySelector = (state:any) => state.collections.allDelivery
export const allServiceSelector = (state:any) => state.collections.allService


export default collectionsReducer