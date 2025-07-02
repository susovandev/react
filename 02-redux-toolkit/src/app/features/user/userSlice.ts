import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { IUserStateShape } from '../../../types'

interface IUserState {
    userInfo: IUserStateShape[]
}

const saveToLocalStorage = (user: IUserStateShape[]) => {
    localStorage.setItem('users', JSON.stringify(user))
}
const getInitialUserInfo = (): IUserStateShape[] => {
    const users = localStorage.getItem('users')
    if (users) return JSON.parse(users)

    const dummyUsers: IUserStateShape[] = [
        {
            id: nanoid(),
            username: 'Susovan',
            email: 'susovan@gmail.com',
            status: 'Fullstack-developer',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]

    localStorage.setItem('users', JSON.stringify(dummyUsers))
    return dummyUsers
}
const initialState: IUserState = {
    userInfo: getInitialUserInfo(),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUserStateShape>) => {
            state.userInfo.push(action.payload)
            saveToLocalStorage(state.userInfo)
        },
        updateUser: (state, action) => {
            state.userInfo = state.userInfo.map((user) =>
                user.id === action.payload?.id
                    ? { ...action.payload, id: user.id }
                    : user
            )
            saveToLocalStorage(state.userInfo)
        },
        removeUser: (state, action) => {
            state.userInfo = state.userInfo.filter(
                (user) => user.id !== action.payload
            )
            saveToLocalStorage(state.userInfo)
        },
    },
})

export const { addUser, updateUser, removeUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.userInfo

export default userSlice.reducer
