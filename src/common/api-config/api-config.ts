import axios from "axios";

const API_KEY: string = process.env.REACT_APP_TODOLIST_KEY || ''

export const instance = axios.create(
  {
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
      'API-KEY': API_KEY
    }
  }
)