import React, { useEffect, useState } from 'react';
import './BorrowedBooks.css';

const UnreturnedBooks = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUnreturnedRecords();
  }, []);

  const fetchUnreturnedRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8082/borrow/unreturned');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.error('Error fetching unreturned records:', err);
      setError('Failed to load unreturned books.');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (recordId) => {
    try {
      const response = await fetch('http://localhost:8082/borrow/returnBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId }),
      });

      const result = await response.text();
      setSuccessMessage(result);
      fetchUnreturnedRecords(); // Refresh list after return
    } catch (err) {
      console.error('Return failed:', err);
      setError('Return operation failed. Try again.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Unreturned Books</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      {records.length > 0 ? (
        <div className="card-container">
          {records.map((record) => (
            <div key={record.id} className="book-card">
              <h3 className="text-xl font-semibold mb-1">{record.book?.title}</h3>
              <p><strong>Author:</strong> {record.book?.author}</p>
              <p><strong>ISBN:</strong> {record.book?.isbn}</p>
              <p><strong>Borrower:</strong> {record.userEmail}</p>
              <p><strong>Borrowed On:</strong> {new Date(record.borrowedDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> {new Date(record.dueDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {record.status}</p>

              <button
                onClick={() => handleReturn(record.id)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No unreturned books found.</p>
      )}
    </div>
  );
};

export default UnreturnedBooks;
