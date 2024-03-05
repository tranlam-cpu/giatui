import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getUsers = createAsyncThunk('Users/usersFetched',async ()=>{
	
	const response= await axios.get('/api/users')
	return response.data
})

export const bannerUser = createAsyncThunk('Users/usersBanner',async (users:any)=>{
	const item={
			users,
			banned: true
		}
	
	const response=await axios.post('/api/bannerUser',item)
	return response.data
})

export const unbanUser = createAsyncThunk('Users/unbanUsers',async (users:any)=>{
		const item={
			users,
			banned: false
		}
		const response=await axios.post('/api/bannerUser',item)
		return response.data
})

const userSlices = createSlice({
	name: 'users',
	initialState:{
		allUsers:{ success: false, users: [] },
		allBanned:{ success: false, users: [] },
	},
	reducers:{
	},
	extraReducers: (builder)=>{
		//GET datetime
		//chay di lay data
		builder
		.addCase(getUsers.fulfilled,(state,action)=>{		
			const result={success:true,users:action.payload.users.filter((obj:any) => obj.banned === false)}
			const resultBanned={success:true,users:action.payload.users.filter((obj:any) => obj.banned === true)}
			state.allUsers=result
			state.allBanned=resultBanned
			
		})
		.addCase(bannerUser.fulfilled,(state,action)=>{		
			// const targetId=action.meta.arg;
			// state.allUsers={success:true,users:state.allUsers.users.filter((item)=> !targetId.includes(item.id))}
			const targetId = action.meta.arg;
			if (Array.isArray(targetId) && state.allUsers && Array.isArray(state.allUsers.users)) {
				state.allUsers = {
					success: true,
					users: state.allUsers.users.filter((item:any) => item.id && !targetId.includes(item.id)),
				};
			} else {
				console.log('error')
			}
		})
		.addCase(unbanUser.fulfilled,(state,action)=>{		
			// const targetId=action.meta.arg;
			// state.allBanned={success:true,users:state.allBanned.users.filter((item)=> !targetId.includes(item.id))}
			const targetId = action.meta.arg;
			if (Array.isArray(targetId) && state.allBanned && Array.isArray(state.allBanned.users)) {
				state.allBanned = {
					success: true,
					users: state.allBanned.users.filter((item:any) => item.id && !targetId.includes(item.id)),
				};
			} else {
				console.log('error')
			}
		})
	}
})



//reducer

const usersReducer = userSlices.reducer

// selector (lay ben index.js)
export const usersSelector = (state:any) => state.users.allUsers
export const bannedUsersSelector = (state:any) => state.users.allBanned


export default usersReducer