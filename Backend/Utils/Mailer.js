const mailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const OAuth2 = google.auth.OAuth2;

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports.sendMail = async (receiverMail, verificationToken) => {
    try {
     /* const { google } = require('googleapis');
      const fs = require('fs');
    
      
    
      const oauth2Client = new google.auth.OAuth2(
        
        process.env.CLIENT_ID,
        
        process.env.CLIENT_SECRET,
      
        process.env.REDIRECT_URI
      );

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',  // This ensures a refresh token is granted
        scope: ['https://www.googleapis.com/auth/gmail.send'],  // Add scopes you need, e.g., Gmail send
      });
      
      console.log('Authorize this app by visiting this URL:', authUrl);
      const refresh = process.env.REFRESH_TOKEN;
      
    
      oauth2Client.setCredentials({ refresh });
      
      oauth2Client.getAccessToken()
        .then(response => {
          console.log('New Access Token:', response.token);
      
        })
        .catch(err => {
          console.error('Error refreshing access token:', err);
        });

*/







        console.log("client id: " + CLIENT_ID);
        console.log("client secret: " + CLIENT_SECRET);
        console.log("redirect uri: " + REDIRECT_URI);
        console.log("refresh token: " + REFRESH_TOKEN);
        console.log(process.env.AUTHORIZATION_CODE);
        const access_token = "ya29.a0AeXRPp6o9hjAyDHtTJ5mOUJ9EyS48F0GDHIoNJmob9bUU4nw8GewYBdoei_ph5sxr9De5yb5RIQ1EpikoWECw3dTBbI8nTqHi-iexw-TA4ZXAambjWn1B39AHu1aNqgvt98noSk29YLbkj2LveSWY0Vjp22k1akE1Ij1Y6GtaCgYKAU4SARISFQHGX2MiBDYC2rKug63-MyZqhUW7vw0175";
        console.log(access_token);
        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'bankerweloveyourmoney@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: access_token
            }
        });

        const verificationUrl = `http://localhost:3001/account-verification?token=${verificationToken}`;

        const mailOptions = {
            from: 'bankerweloveyourmoney@gmail.com',
            to: receiverMail,
            subject: 'Account verification',
            html: `
                  <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                    <div style="background-color: black; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                      <h1 style="color: gold;">Confirm Your Email</h1>
                      <p style="font-size: 16px; color: gold;">Welcome to our family! Click the button below to verify your email address and start giving us your money.</p>
                      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: gold; color: black; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Verify Email
                      </a>
                    </div>
                  </div>
                    <style>
            a:hover {
              background-color: black !important;  /* Change background color on hover */
              color: gold !important;  /* Change text color on hover */
            }
          </style>
                `
        };

        const info = transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}