import axios from './axios'

const API = 'http://localhost:3000/api'

export const registerRequest = async (user) => axios.post(`${API}/auth/register`, user)
export const loginRequest = async (user) => axios.post(`${API}/auth/login`, user)
export const verifyTokenRequest = async () => axios.get(`${API}/auth/validate`)
