import React, { useState } from 'react';
import { borrowBook } from './borrowService';

const BorrowBookForm = ({ book, onClose }) => {
  const [email, setEmail] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleBorrow = async () => {
    try {
      const res = await borrowBook(book.isbn, email, dueDate);
      setMessage(res.data);
      onClose(); 
    } catch (err) {
      setMessage('Error borrowing book.');
    }
  };

  return (
    <div>
      <h3>Borrow {book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleBorrow}>Borrow</button>
      <button onClick={onClose}>Cancel</button>
      <p>{message}</p>
    </div>
  );
};

export default BorrowBookForm;
