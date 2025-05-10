import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../bookService';
import ReturnBookForm from './ReturnBookForm';
import './BorrowedBooks.css';

const BorrowedBooks = ({ currentUser }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState(null); 

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllBooks();
      const books = res.data;
      const userBorrowedBooks = books.filter(
        (book) => book.availabilityStatus === false && book.borrowedBy === currentUser
      );
      setBorrowedBooks(userBorrowedBooks);
    } catch (err) {
      console.error('Error loading borrowed books:', err);
      setError('There was an error loading your borrowed books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReturnClick = (recordId) => {
    console.log('Selected Record ID:', recordId); // Debug log to verify recordId
    setSelectedRecordId(recordId);
  };

  const handleReturnSuccess = () => {
    fetchBorrowedBooks();
    setSelectedRecordId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Borrowed Books</h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {borrowedBooks.length > 0 ? (
        <div className="card-container">
          {borrowedBooks.map((book) => {
            console.log(book); // Log the whole book object to verify if `id` exists
            return (
              <div key={book.isbn} className="book-card">
                <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Status:</strong> Borrowed</p>
                <p className="text-sm text-gray-500 mt-2">
                  Borrowed on: {new Date(book.borrowedDate).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleReturnClick(book.id)} // Use book.id if available
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Return Book
                </button>

                {selectedRecordId === book.id && (
                  <ReturnBookForm
                    recordId={book.id}
                    onClose={() => setSelectedRecordId(null)}
                    onSuccess={handleReturnSuccess}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">You have not borrowed any books yet.</p>
      )}
    </div>
  );
};

export default BorrowedBooks;
