import { store } from './store'
import { addUser, updateUser, removeUser } from './features/user/userSlice'
import { useAppDispatch, useAppSelector } from './hooks'
import userReducer from './features/user/userSlice'

export {
    store,
    addUser,
    updateUser,
    removeUser,
    useAppDispatch,
    useAppSelector,
    userReducer,
}
