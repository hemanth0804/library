import axios from 'axios';

// Centralized API configuration using axios instance
const api = axios.create({
  baseURL: 'http://localhost:8082/borrow', // Base URL
  headers: { 'Content-Type': 'application/json' }, // Default headers
});

// Error handling helper function
const handleError = (error) => {
  console.error('API Error: ', error.response ? error.response.data : error.message);
  return Promise.reject(error.response ? error.response.data : error.message);
};

// Function to borrow a book
export const borrowBook = (isbn, email, dueDate) => {
  return api
    .post('/borrowBook', { isbn, email, dueDate })
    .catch(handleError); // Error handling
};

// Function to return a book
export const returnBook = async (recordId) => {
  try {
    const response = await api.post('/returnBook', { recordId });
    return response.data; // Return the data from the response
  } catch (error) {
    return handleError(error); // Handle errors
  }
};

// Get all records
export const getAllRecords = () => {
  return api.get('/all').catch(handleError); // Error handling
};

// Get records by email (user-specific records)
export const getRecordsByEmail = (email) => {
  return api.get(`/user/${email}`).catch(handleError); // Error handling
};

// Get unreturned books
export const getUnreturnedBooks = () => {
  return api.get('/unreturned').catch(handleError); // Error handling
};

// Get a record by its ID
export const getRecordById = (id) => {
  return api.get(`/record/${id}`).catch(handleError); // Error handling
};
