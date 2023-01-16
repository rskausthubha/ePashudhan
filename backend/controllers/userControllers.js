const User = require('../models/register');

exports.createUser = async (req, res) => {
    const { firstName, lastName, address, phNumber, email, createdUsername, createdPassword, createdConfirmPassword, getPromotionalNotifs } = req.body;

    const userExists = await User.userExists(createdUsername);
    if (userExists) {
        return res.json({
            success: false,
            message: "User already exists. Try logging in instead."
        });
    }

    const user = await User({
        firstName,
        lastName,
        address,
        phNumber,
        email,
        createdUsername,
        createdPassword,
        createdConfirmPassword,
        getPromotionalNotifs
    });

    await user.save(err => {
        if (err) {
            console.error(`Error saving user to the database. >> ${err}`);       // NOTE: If a duplication error occurs, drop the collection and try again
        } else {
            console.log('User saved to database!');
        }
    });

    res.json(user);
};
