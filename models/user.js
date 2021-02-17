const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true 
	}
},
	{
		timestamps: true     //We need the time for user created and user updated hence we use this.
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;