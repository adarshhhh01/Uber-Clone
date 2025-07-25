const { model } = require('mongoose');
const userModel = require('../models/user.model');


module.exports.createUser = async (userData) => {
    const { firstName, lastName, email, password } = userData;
    if (!firstName  || !email || !password) {   
        throw new Error('All fields are required');
    }
     
    const user =await userModel.create({
        
        firstName,
        lastName,
        email,
        password
    });
    return user;
}   

   