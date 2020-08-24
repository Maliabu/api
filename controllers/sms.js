require('dotenv').config();

const apiKey = process.env.YOUR_API_KEY;
const username = process.env.YOUR_USERNAME;

const sendSms = (phone, message) => {
  const AfricasTalking = require('africastalking')(apikey, username);
  const sms = africastalking.SMS
    .create({
       body: message,
       from: process.env.PHONE_NUMBER,
       to: phone
     })
    .then(response => console.log(response)).catch(err=>{
        console.log(err);
    });
}

module.exports = sendSms;

