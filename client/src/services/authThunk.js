import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Ваш URL-база для API
const API_BASE_URL = 'http://localhost:8000/api/user'

// Async Thunk для входа пользователя
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Async Thunk для выхода пользователя
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`)
    return null // Возвращаем null, так как выход успешен и данных нет
  } catch (error) {
    console.error('Error logging out:', error)
    return null // Возвращаем null в случае ошибки, но вы можете изменить логику в зависимости от требований
  }
})

// Async Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Async Thunk для регистрации организации
export const registerOrg = createAsyncThunk(
  'auth/registerOrg',
  async (orgData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register-org`, orgData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
