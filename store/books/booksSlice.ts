import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'

export const getBooks = createAsyncThunk('books/getBooks', async () => {
	try {
		const response = await axios.get('/api/books/')
		return response.data
	} catch (e) {
		throw e
	}
})

export const addBook = createAsyncThunk(
	'books/addBook',
	async (data: Book, ThunkAPI) => {
		try {
			const { authors } = ThunkAPI.getState() as RootState
			const author = authors.list.find(
				(item: Author) => item.key === data.author_key
			) as Author
			const newData = {
				...data,
				created_at: new Date().getFullYear(),
				author_first_name: author.first_name,
				author_last_name: author.last_name
			} as Book
			await axios.post('/api/books/', newData)
			return newData
		} catch (error) {
			throw error
		}
	}
)

export const editBook = createAsyncThunk(
	'books/editBook',
	async (data: Book, ThunkAPI) => {
		try {
			const { authors } = ThunkAPI.getState() as RootState
			const author = authors.list.find(
				(item: Author) => item.key === data.author_key
			)
			const newData = {
				...data,
				author_first_name: author.first_name,
				author_last_name: author.last_name
			} as Book
			await axios.post(`/api/books/${data.key}`, newData)
			return newData
		} catch (error) {
			throw error
		}
	}
)

export const removeBook = createAsyncThunk(
	'books/removeBook',
	async (data: Book) => {
		try {
			await axios.delete(`/api/books/${data.key}`)
			return data
		} catch (error) {
			throw error
		}
	}
)

export const getBookById = createAsyncThunk(
	'books/getBookById',
	async (id: string | string[]) => {
		try {
			const response = await axios.get(`/api/books/${id}`)
			return response.data
		} catch (error) {
			throw error
		}
	}
)

export const booksSlice = createSlice({
	name: 'books',
	initialState: {
		loading: false,
		list: []
	} as BooksState,
	reducers: {},
	extraReducers: {
		[getBooks.pending as any]: state => {
			state.loading = true
		},
		[getBooks.fulfilled as any]: (state, { payload }: { payload: Book[] }) => {
			state.list = payload
			state.loading = false
		},
		[getBooks.rejected as any]: state => {
			state.loading = false
		},
		[editBook.fulfilled as any]: (state, { payload }: { payload: Book }) => {
			let book = state.list.find(book => book.key === payload.key)
			if (book) {
				book = {
					...book,
					...payload
				}
			}
		},
		[addBook.fulfilled as any]: (state, { payload }: { payload: Book }) => {
			state.list = [...state.list, payload]
		},
		[removeBook.fulfilled as any]: (state, { payload }: { payload: Book }) => {
			const index = state.list.findIndex(
				(book: Book) => book.key === payload.key
			)
			if (index > -1) {
				state.list.splice(index, 1)
			}
		},
		[getBookById.pending as any]: state => {
			state.loading = true
		},
		[getBookById.fulfilled as any]: state => {
			state.loading = false
		}
	}
})

export default booksSlice.reducer
