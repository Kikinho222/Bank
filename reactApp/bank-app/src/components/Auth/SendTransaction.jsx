import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SendTransaction.css'; 

const SendTransaction = () => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!receiverEmail || !amount) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        'http://localhost:3000/api/transactions/send', 
        {
          receiverEmail,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(response.data.message);  // Show success message to the user
        
        if (amount >= 1000) {
          // Redirect to the celebration page if the amount is greater than 1000
          navigate('/celebration');
        }
      }

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Something went wrong!');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="page-container">
    <div className="transfer-container">
      <h2>Transfer Money</h2>
      <form onSubmit={handleSubmit} className="transfer-form">
        <div className="form-group">
          <label htmlFor="receiverEmail">Email of the lucky one</label>
          <input
            type="email"
            id="receiverEmail"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            placeholder="Enter the reciever email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <button type="submit" className="btn-submit">Transfer</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
    </div>
  );
};

export default SendTransaction;
