import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getDaytimes = createAsyncThunk('Daytimes/DaytimesFetched',async ()=>{
    
    const response= await axios.get('/api/daytime')
    return response.data
})

export const CreateDaytime = createAsyncThunk('Daytimes/AddDaytimes',async (daytime:object)=>{
	
	const response=await axios.post('/api/daytime',daytime, {
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
	})
	return response.data;
})

export const UpdateDaytime = createAsyncThunk('Daytimes/UpdateDaytime',async (daytime:object)=>{
	
	const response=await axios.put('/api/daytime',daytime, {
		headers: {
		  'Content-Type': 'multipart/form-data'
		}
	})

	return response.data;
	
})

export const DeleteDaytime=createAsyncThunk('Daytimes/DeleteDaytime',async (array:[])=>{
	const response=await axios.delete('/api/daytime',{data:array})
	return response.data
})

const daytimeSlices = createSlice({
	name: 'daytimes',
	initialState:{
		allDaytimes:[],
	},
	reducers:{
	},
			extraReducers: (builder)=>{
				//GET datetime
				//chay di lay data
						builder
				        .addCase(getDaytimes.fulfilled,(state,action)=>{	
							state.allDaytimes=action.payload.daytimes
							        
				        })
						.addCase(CreateDaytime.fulfilled,(state,action)=>{	
							(state.allDaytimes as any[]).unshift(action.payload)
						})
						.addCase(DeleteDaytime.fulfilled,(state,action)=>{	
							//lay id cua array
							const targetArrayId:any = action.meta.arg;

							state.allDaytimes=state.allDaytimes.filter((item: any) => !targetArrayId.includes(item.id))
						})
						.addCase(UpdateDaytime.fulfilled,(state,action)=>{	
							const {id,name,image}=action.payload
							const index=state.allDaytimes.findIndex((item:any)=>item.id===id)
							state.allDaytimes[index]=action.payload as never
						})
			}
})

//reducer

const daytimesReducer = daytimeSlices.reducer

// selector (lay ben index.js)
export const daytimesSelector = (state:any) => state.daytimes.allDaytimes



export default daytimesReducer