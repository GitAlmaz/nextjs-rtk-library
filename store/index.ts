import { configureStore } from '@reduxjs/toolkit'
import authorsReducer from './authors/authorsSlice'
import booksSlice from './books/booksSlice'

const store = configureStore({
	reducer: {
		authors: authorsReducer,
		books: booksSlice
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
