const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const AccountRoute = require('./Routes/AccountRoute');
const TransactionsRoute = require('./Routes/TransactionsRoute');
const cors = require('cors');
const { setupSocket } = require('./Services/SocketIO');


dotenv.config();

const app = express();
const server = http.createServer(app);
setupSocket(server);
const PORT = 3000;

const corsOptions = {
  origin : 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/images", express.static("public/images"));

try { 
  mongoose.connect(process.env.MONGO_URI, null);
  console.log('MongoDB connected');
} catch {
  console.log(e);
}
  

app.use('/api/user', AccountRoute);
app.use('/api/transactions', TransactionsRoute);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});











/*const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  balance: { type: Number, default: 1000 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
//transactions
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);*/