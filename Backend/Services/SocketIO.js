// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const jwt = require('jsonwebtoken');
// const { Account } = require('../Models/Account'); 

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const emailToSocketMap = new Map();

// const authenticateSocket = (socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return next(new Error('Authentication error'));
//       }
//       socket.user = decoded;  
//       next();
//     });
//   } else {
//     return next(new Error('Authentication error'));
//   }
// };

// io.use(authenticateSocket); 


// io.on('connection', (socket) => {
//   console.log('User connected:', socket.user.id);
  

//   socket.on('money-transfer', (data) => {
//     const { senderId, receiverId, amount, message } = data;


//     saveTransactionToDB(senderId, receiverId, amount, message);


//     Account.findById(receiverId).then((user) => {
//       if (user.socketId) {
      
//         io.to(user.socketId).emit('new-notification', {
//           senderId,
//           message,
//           amount,
//         });
//       }
//     });
//   });


//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.user.id);
//   });
// });


// const saveTransactionToDB = async (senderId, receiverId, amount, message) => {
// };

// server.listen(3002, () => {
//   console.log('Server is running on port 3002');
// });


// src/services/socketService.js
const socketIo = require('socket.io');

// This will hold users' socket IDs by their emails
let users = {};

function setupSocket(server) {
  const io = socketIo(server);

  // When a user connects, listen for messages
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Register user with email
    socket.on('register', (email) => {
      users[email] = socket.id;
    });

    // Handle transaction event
    socket.on('transaction', (data) => {
      const { receiverEmail, amount, message } = data;

      // Send the message to the receiver
      if (users[receiverEmail]) {
        io.to(users[receiverEmail]).emit('notification', { amount, message });
      }
    });

    // When a user disconnects, remove them from the list
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
}

module.exports = {
  setupSocket,
};
