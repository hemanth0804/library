import axios from 'axios';

const API_URL = 'http://localhost:8082/books';

export const addBook = (book) => {
  return axios.post(`${API_URL}/add`, book);
};

export const getAllBooks = () => {
  return axios.get(`${API_URL}/getall`);
};

export const getBookByIsbn = (isbn) => {
  return axios.get(`${API_URL}/get/${isbn}`);
};

export const updateBook = (book) => {
  return axios.post(`${API_URL}/update`, book);
};

export const deleteBook = (isbn) => {
  return axios.post(`${API_URL}/delete`, { isbn });
};

export const updateBookAvailability = async (isbn, updatedBook) => {
  try {
    const response = await axios.put(`${API_URL}/${isbn}/borrow`, updatedBook);
    return response.data;
  } catch (err) {
    console.error('Error updating book availability:', err);
    throw new Error('Failed to update book availability');
  }
};

export const getBorrowedBooksByUser = (username) => {
  return axios.get(`${API_URL}/borrowed?user=${username}`);
};

export const returnBook = async (isbn) => {
  try {
    const response = await axios.put(`${API_URL}/${isbn}/return`);
    return response.data;
  } catch (err) {
    console.error('Error returning book:', err);
    throw new Error('Failed to return the book. Please try again.');
  }
};
