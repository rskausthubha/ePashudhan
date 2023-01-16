const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userAddressSchema = new mongoose.Schema({
    hNoAndStreet: String,
    area: String,
    cityOrDistrict: String,
    state: String
});

const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: userAddressSchema,
        required: true
    },
    phNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdUsername: {
        type: String,
        required: true
    },
    createdPassword: {
        type: String,
        required: true
    },
    createdConfirmPassword: {
        type: String,
        required: true
    },
    getPromotionalNotifs: Boolean
});

// User checking
registrationSchema.statics.userExists = async function (createdUsername) {    //Didn't work when the async function was an arrow function (Why??)     [Arrow functions can't use 'this' keyword]
    if (!createdUsername) {
        throw new Error('Error. No username provided.');
    }

    try {
        const user = await this.findOne({ createdUsername });
        if (user) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(`Error in existingUser function. >> ${err}`);

        return true;
    }
};

module.exports = mongoose.model('RegisteredUser', registrationSchema);
