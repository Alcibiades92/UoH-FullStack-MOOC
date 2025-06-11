import { current, createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', password: '' },
  reducers: {
    setUsername(state, action) {
      return { ...state, username: action.payload }
    },
    setPassword(state, action) {
      return { ...state, password: action.payload }
    },
    setUser(state, action) {
      return { ...state, user: action.payload }
    },
    setReset(state, action) {
      return { user: null, password: '', username: '' }
    },
  },
})

export const LoginAction = (username, password) => {
  return async (dispatch, getState) => {
    dispatch(setUsername(username))
    dispatch(setPassword(password))
    const state = getState()
    const user = state.user

    const userr = await loginService.login({
      username: user.username,
      password: user.password,
    })
    window.localStorage.setItem('loggedInUser', JSON.stringify(userr))
    blogService.setToken(userr.token)

    dispatch(setUsername(''))
    dispatch(setPassword(''))
    dispatch(setUser(userr))
    return userr
  }
}
export const LogOutAction = () => {
  return async (dispatch, getState) => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    dispatch(setReset())
  }
}

export default userSlice.reducer

export const { setUsername, setPassword, setUser, setReset } = userSlice.actions
