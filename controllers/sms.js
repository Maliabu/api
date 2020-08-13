require('dotenv').config();

const credentials = {
    apiKey: 'YOUR_API_KEY',         // use your sandbox app API key for development in the test environment
    username: 'YOUR_USERNAME',      // use 'sandbox' for development in the test environment
};
const AfricasTalking = require('africastalking')(credentials);

// Initialize a service e.g. SMS
const sms = africastalking.SMS
const phone = []

// Use the service
const options = {
    to: phone,
    message: "Dear customer, thank you for being part of 2go financial services limited"
}

// Send message and capture the response or error
sms.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });
