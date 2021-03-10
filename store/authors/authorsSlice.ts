import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsers = createAsyncThunk('authors/getUsers', async () => {
	try {
		const response = await axios.get('/api/authors')
		return response.data
	} catch (error) {
		throw error
	}
})

export const addUser = createAsyncThunk(
	'authors/addUser',
	async (data: Author) => {
		try {
			await axios.post('/api/authors', data)
			return data
		} catch (error) {
			throw error
		}
	}
)

export const editUser = createAsyncThunk(
	'authors/editUser',
	async (data: Author) => {
		try {
			await axios.post(`/api/authors/${data.key}`, data)
			return data
		} catch (error) {}
	}
)

export const removeUser = createAsyncThunk(
	'authors/removeUser',
	async (data: Author) => {
		try {
			await axios.delete(`/api/authors/${data.key}`)
			return data
		} catch (error) {}
	}
)

export const getUserById = createAsyncThunk(
	'authors/getUserById',
	async (id: string) => {
		try {
			const response = await axios.get(`/api/authors/${id}`)
			return response.data
		} catch (error) {}
	}
)

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: {
		loading: false,
		list: []
	} as AuthorsState,
	reducers: {},
	extraReducers: {
		[getUsers.pending as any]: state => {
			state.loading = true
		},
		[getUsers.fulfilled as any]: (
			state,
			{ payload }: { payload: Author[] }
		) => {
			state.list = payload
			state.loading = false
		},
		[getUsers.rejected as any]: state => {
			state.loading = false
		},
		[addUser.pending as any]: state => {
			state.loading = true
		},
		[addUser.fulfilled as any]: (state, { payload }: { payload: Author }) => {
			state.list = [...state.list, payload]
			state.loading = false
		},
		[addUser.rejected as any]: state => {
			state.loading = false
		},
		[editUser.fulfilled as any]: (state, { payload }: { payload: Author }) => {
			const author = state.list.find(author => author.key === payload.key)
			if (author) {
				author.first_name = payload.first_name
				author.last_name = payload.last_name
			}
		},
		[removeUser.fulfilled as any]: (
			state,
			{ payload }: { payload: Author }
		) => {
			const index = state.list.findIndex(
				(author: Author) => author.key === payload.key
			)
			if (index > -1) {
				state.list.splice(index, 1)
			}
		}
	}
})

export default authorsSlice.reducer
