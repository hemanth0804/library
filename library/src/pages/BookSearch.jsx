import React, { useEffect, useState } from 'react';
import { getAllBooks, updateBookAvailability } from '../bookService';
import BorrowBookForm from './BorrowBookForm'; // Import the BorrowBookForm
import './BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showBorrowForm, setShowBorrowForm] = useState(false); // State to show borrow form
  const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await getAllBooks();
      setAllBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error('Error loading books:', err);
    }
  };

  const handleSearch = () => {
    const filtered = allBooks.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.includes(query)
    );
    setFilteredBooks(filtered);
  };

  const handleBorrow = (book) => {
    setSelectedBook(book); // Store the selected book
    setShowBorrowForm(true); // Show the borrow form
  };

  const closeForm = () => {
    setShowBorrowForm(false); // Close the borrow form
    setSelectedBook(null); // Clear the selected book
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Book Library</h2>

      {/* Search input and button */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Display filtered books */}
      {filteredBooks.length > 0 ? (
        <div className="card-container">
          {filteredBooks.map(book => (
            <div key={book.isbn} className="book-card">
              <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <p><strong>Available:</strong> {book.availabilityStatus ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-500 mt-2">
                Added on: {new Date(book.addedDate).toLocaleDateString()}
              </p>

              {/* Borrow button */}
              <button
                onClick={() => handleBorrow(book)} // Calls handleBorrow on button click
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={!book.availabilityStatus} // Disables button if the book is unavailable
              >
                {book.availabilityStatus ? 'Borrow Book' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No books to show.</p>
      )}

      {/* Conditionally render the BorrowBookForm */}
      {showBorrowForm && selectedBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeForm} className="close-btn">X</button>
            <BorrowBookForm
              book={selectedBook} // Pass selected book to the form
              onClose={closeForm} // Pass close function to the form
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
