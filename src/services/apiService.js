import axios from 'axios';

const API_BASE_URL = 'https://test-backend-jrez.onrender.com/api/users';

export const createUser = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
