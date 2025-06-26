import { current, createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],

  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUsers(state, action) {
      state.push(action.payload)
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch, getState) => {
    const users = await usersService.getAllUsers()

    dispatch(setUsers(users))
  }
}

export const createUser = (newUser) => {
  return async (dispatch, getState) => {
    const user = await usersService.createUser(newUser)
    dispatch(appendUsers(user))
  }
}

export default usersSlice.reducer

export const { setUsers, appendUsers } = usersSlice.actions
