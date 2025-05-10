import React, { useState, useEffect } from 'react';
import { returnBook } from './borrowService';

const ReturnBookForm = ({ recordId, onClose, onSuccess }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage('');
  }, [recordId]);

  const handleReturn = async () => {
    if (!recordId) {
      setMessage('Error: No valid record ID provided.');
      console.error('Error: No valid record ID provided.');
      return;
    }

    setLoading(true);
    console.log("Returning book with Record ID:", recordId); // Debug log for recordId

    try {
      const res = await returnBook(recordId);
      console.log("Response from server:", res); // Debug log for server response
      setMessage(res.data || 'Book returned successfully.');
      onSuccess(); // trigger refresh in parent
      onClose();   // hide the form
    } catch (err) {
      console.error("Error during return process:", err); // Detailed error log
      setMessage('Error returning book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow mt-4">
      <h3 className="font-semibold">Confirm Return for Record ID: {recordId}</h3>
      <button
        onClick={handleReturn}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'Returning...' : 'Confirm Return'}
      </button>
      <button onClick={onClose} className="ml-2 text-red-600">Cancel</button>
      <p className="text-sm mt-2 text-gray-700">{message}</p>
    </div>
  );
};

export default ReturnBookForm;
