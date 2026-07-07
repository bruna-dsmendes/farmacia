import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://farmacia-jjxo.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  }
});