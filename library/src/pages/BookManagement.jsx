import React, { useEffect, useState } from 'react';
import { getAllBooks, addBook, deleteBook, getBookByIsbn, updateBook } from '../bookService';
import './BookManagement.css'; // Optional for styling

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    price: 0,
    availabilityStatus: true,
    addedDate: new Date().toISOString()
  });

  const [searchIsbn, setSearchIsbn] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    getAllBooks().then(res => setBooks(res.data));
  };

  const handleAddOrUpdate = () => {
    if (isEditing) {
      updateBook(newBook.isbn, newBook).then(() => {
        setIsEditing(false);
        loadBooks();
      });
    } else {
      addBook(newBook).then(() => loadBooks());
    }

    setNewBook({
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      price: 0,
      availabilityStatus: true,
      addedDate: new Date().toISOString()
    });
  };

  const handleDelete = (isbn) => {
    deleteBook(isbn).then(() => loadBooks());
  };

  const handleSearch = () => {
    getBookByIsbn(searchIsbn).then(res => {
      setBooks([res.data]);
    }).catch(() => {
      alert("Book not found");
    });
  };

  return (
    <div className="container">
      <h2>📚 Book Management</h2>
      <div className="form">
        <input type="text" placeholder="ISBN" value={newBook.isbn}
               onChange={e => setNewBook({ ...newBook, isbn: e.target.value })} />
        <input type="text" placeholder="Title" value={newBook.title}
               onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
        <input type="text" placeholder="Author" value={newBook.author}
               onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
        <input type="text" placeholder="Publisher" value={newBook.publisher}
               onChange={e => setNewBook({ ...newBook, publisher: e.target.value })} />
        <input type="number" placeholder="Price" value={newBook.price}
               onChange={e => setNewBook({ ...newBook, price: parseFloat(e.target.value) })} />
        <button onClick={handleAddOrUpdate}>{isEditing ? "Update Book" : "Add Book"}</button>
      </div>
      <div className="form-group">
        <input type="text" placeholder="Search by ISBN" value={searchIsbn}
               onChange={e => setSearchIsbn(e.target.value)} />
        <button onClick={handleSearch}>Search Book</button>
        <button onClick={loadBooks}>Reset</button>
      </div>
      <div className="card-container">
        {books.map(book => (
          <div className="book-card" key={book.isbn}>
            <h4>{book.title}</h4>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Status:</strong> {book.availabilityStatus ? 'Available' : 'Unavailable'}</p>
            <button onClick={() => handleDelete(book.isbn)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManagement;
