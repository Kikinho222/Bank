import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SolidBlackBackground from './solidBlackBackground.jpg'
import './Dashboard.css'; // Import the CSS file for custom styles

function Dashboard() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("token");
      console.log(token);
      if (!token) {
        navigate('/'); // Redirect to login if no token exists
        return;
      }

      try {
        // Fetch user profile from the backend
        const userResponse = await axios.get('http://localhost:3000/api/user/account', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });

        setUser(userResponse.data); // Store the user data in the state

        // Fetch the transactions for the logged-in user
        const transactionResponse = await axios.get('http://localhost:3000/api/transactions/getTransactions', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });
        setTransactions(transactionResponse.data); // Store the transactions in state
      } catch (error) {
        console.log(error.response.data.message);
        if(error.response.data.message === "Token has expired. Please login again") {
          sessionStorage.removeItem("token");
        }
        navigate('/login'); // Redirect to login if there’s an error (e.g., token expired)
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Box sx={{ padding: 3 }} className="dashboard-box">
        <Typography variant="h4" gutterBottom className="welcome-message" sx={{color: 'white', fontSize: '2.5rem', textShadow: '4px 4px 4px black', fontWeight: 'bold'}}>
          Welcome, {user.name}!
        </Typography>

        {/* User Account Details */}
        <Paper className="account-info" sx={{backgroundColor: '#333333', border: '3px solid gold'}}>
          <Typography variant="h6" className="section-title">Account Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Account Balance:</strong> ${user.balance}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Transactions Table */}
        <Typography variant="h6" gutterBottom className="section-title" sx={{color: 'white', textAlign: 'center', fontWeight: 'bold', padding: '10px', fontSize: '2.5rem', textShadow: '4px 4px 4px black'}}>
          Recent Transactions
        </Typography>

        {transactions.length > 0 ? (
          <TableContainer component={Paper} className="transactions-table" sx={{backgroundColor: '#333333', border: '3px solid gold'}}>
            <Table>
              <TableHead>
                <TableRow sx={{border: '2px solid gold'}}>
                  <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>Sender</TableCell>
                  <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>Receiver</TableCell>
                  <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>Amount</TableCell>
                  <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index} sx={{border: '2px solid gold'}}>
                    <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>{transaction.sender}</TableCell>
                    <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>{transaction.receiver}</TableCell>
                    <TableCell 
                      sx={{
                        color: transaction.sender === user.email ? 'red' : 'green',
                        fontWeight: 'bold'
                      }}
                      >
                      {transaction.sender === user.email ? `-$${transaction.amount}` : `+$${transaction.amount}`}
                    </TableCell>
                    <TableCell sx={{color: 'gold', fontWeight: 'bold'}}>{new Date(transaction.timeStamp).toLocaleString()}</TableCell> {/* Format date */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No recent transactions.
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default Dashboard;






