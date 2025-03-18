const dotenv = require('dotenv');
const Account = require('../Models/Account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../Utils/Mailer');
const jwtService = require('../Services/JwtService');

module.exports.register = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const { name, email, password, phoneNumber } = req.body;

        //check if email is already exists
        const existedAccount = await Account.findOne({email});
        if(existedAccount) {
            return res.status(400).send('Email is already exists');
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create account
        const newAccount = new Account({name, email, password: hashedPassword, phoneNumber});

        //save to db
        await newAccount.save();

        const verificationToken = jwtService.generateVerificationToken(email);

        res.status(201).send('User registered successfully');
        mailer.sendMail(email, verificationToken); 

    } catch(e) {
        console.error(e);
        res.status(500).send('Server fail');
    }
    console.log("registerrrr");
};

module.exports.login = async (req, res) => {
    try {
        console.log("hey");
        console.log(req.body);
        const {email, password} = req.body;

        //check if email exists
        const existedAccount = await Account.findOne({email});
        if(!existedAccount) {
            console.log("oh1");
            return res.status(400).send( { message: "Email is not exist" });
        }

        if(!existedAccount.isConfirmed) {
            return res.status(400).send( { message: "Account verification is needed"} );
        }
        
        //check if password match
        const isMatch = await bcrypt.compare(password, existedAccount.password);
        if(!isMatch) {
            console.log("oh2");

            return res.status(400).send( {message: "wrong password" });
        }

        const token = jwt.sign({id: existedAccount._id }, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        res.json({ token });
    } catch(e) {
        console.log(e);
        res.status(500).send('Server fail');
    }
    console.log('login');
};

module.exports.getAccount = async (req, res) => {
    console.log("jey");
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log("here1");
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        console.log("here2");
        console.log(decoded.email);
        const account = await Account.findOne({_id: decoded.id});
        console.log("here3");
        console.log(account);
        if(!account) {
            return res.status(404).json({message: 'Account not found'});
        }
        
        res.json(account);
    } catch(e) {
        res.status(500).json({message: 'Server fail'});
    }
}

module.exports.verifyAccount = async (req, res) => {
    console.log("heyyyeye");
    const { verificationToken } = req.body;
    console.log(verificationToken);
    if(!verificationToken) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET_KEY);
        console.log(decoded.email);
        const account = await Account.findOne({ email: decoded.email });
        if(!account) {
            return res.status(404).json({ success: false, message: 'Account not found' });
        }
        console.log(account.isConfirmed);
        if(account.isConfirmed) {
            return res.status(400).json({ success: false, message: 'Account is already confirmed'});
        }

        account.isConfirmed = true;
        account.save();

        res.json({ success: true, message: 'Account successfully verified!'});
    } catch (error) {
        console.error('Error verifying token: ', error);
        res.status(400).json({ success: false, message: 'Invalid or epired token' });
    }
}