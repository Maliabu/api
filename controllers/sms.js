require('dotenv').config();

const credentials = {
    apiKey: 'd8b41ead19b66ee6774a34db0595f2026f1c468e40fceac512b696a18a2c79fe',         
    username: 'Companysms',    
};
const AfricasTalking = require('africastalking')(credentials);

// Initialize a service e.g. SMS
const sms = africastalking.SMS
const phone_number = [phone]

// Use the service
const options = {
    to: phone_number,
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
