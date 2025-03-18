const Account = require('../Models/Account');
const Transaction = require('../Models/Transaction');
const jwt = require('jsonwebtoken');

module.exports.send = async (req, res) => {
 try{
        console.log("shahar");
        console.log('Request body:', req.body);

        const {receiverEmail, amount} = req.body;
        const parsedAmount = parseFloat(amount);
        const senderAccount = req.account;
        console.log(senderAccount);
        const senderEmail = senderAccount.email;
        //check if email is already exists
        if(senderEmail === receiverEmail || parsedAmount <= 0) {
            return res.status(400).send( {success: false, message: "HAHA you little bastard"} );
        }

        const receiverAccount = await Account.findOne({email : receiverEmail});
        console.log(receiverAccount);
        if(!receiverAccount) {
            return res.status(400).send('Email is not exists');
        }
        
         // Check if the sender has enough balance
        if (senderAccount.balance < parsedAmount) {
            return res.status(400).send( {success: false, message: "Insufficient balance"} );
        }

        // Deduct amount from sender's account
        senderAccount.balance -= parsedAmount;
        // Add amount to receiver's account
        console.log("AMOUNT = " + parsedAmount);
        console.log(receiverAccount.balance);
        receiverAccount.balance += parsedAmount;
        console.log(receiverAccount.balance);
        // Save the updated accounts
        await senderAccount.save();
        await receiverAccount.save();
        /*const receiverID = receiverAccount._id;
        const senderID = senderAccount._id;*/
        const newTransaction = new Transaction({sender: senderEmail, receiver: receiverEmail, amount: parsedAmount});
        //save to db
        await newTransaction.save();

        res.status(200).send({ success: true, message: "Transaction made", parsedAmount});
    } catch(e) {
        console.error(e);
        res.status(500).send('Server fail');
    }

    console.log("transaction send");
    
};

module.exports.getTransactions = async (req, res) => {
    try {
        //console.log(req);
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("transa");
        const account = await Account.findOne({_id: decoded.id});
        const transactions = await Transaction.find({$or: [{sender: account.email}, {receiver: account.email}]}).sort({ timeStamp: -1});
        console.log(transactions);
        res.json(transactions);
    } catch(e) {
        res.status(500).send('Server fail');
    }
}