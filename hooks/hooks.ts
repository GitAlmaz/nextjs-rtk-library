import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'

const useHookDispatch = () => useDispatch<AppDispatch>()
const useHookSelector: TypedUseSelectorHook<RootState> = useSelector

export { useHookDispatch, useHookSelector }