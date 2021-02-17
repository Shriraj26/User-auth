const User = require('../models/user');

module.exports.signin = function(req, res){

	return res.render('signin');

}

module.exports.create = function(req, res){

	//Check if User is giving an email that is genuine or not, if present in DB then give error.
	User.findOne({email: req.body.email}, function(err, user){
		//Handling The internal DB error
		if(err){
			console.log('error in finding user in signing up');
			return
		}
		//If user is giving genuine email then check further
		if(!user){
			User.create(req.body, function(err, user){
				//Handling The internal DB error
				if(err){
					console.log('error in finding user in signing up');
					return
				}

				//If all goes well then User Created successfully with email and password.
				console.log('User Created succsuffly');
				return res.redirect('/');		
			});
		
		//In case of a duplicate email, tell him to give another one.	
		}else{
			console.log('User exists in DB, create another one');
			return res.redirect('/');
		}

	});

	
}