const User = require('../models/user');

module.exports.login = function(req, res){

	console.log(req.cookies);
	return res.render('login');

}


module.exports.profile = function(req, res){

	//Only show the profile if it got cookies from previous page!!!
	if(req.cookies.user_id){
		User.findById(req.cookies.user_id, function(err, user){
			if(user){
				console.log('User matched!!!');
				return res.render('user_details', {
					title: "User Profile",
					user: user
				});
			}
			console.log('Cookie id did not match with user in the DB');
			return res.redirect('/');
		})

	//If the cookie was empty, the user did not come from the login page, and is not authorized to go further.	
	}else{
		console.log('Invalid Cookie');
		return res.redirect('/');
	}

	/*
		If u place this statement here - 
		return res.redirect('/');
		U will get the error that Cannot set headers ... this happens as we also have some return statements
		above. The statements above and this one execute asynchronously. It might happen that both of
		them might execute and it would set headers twice that is not allowed. Thus we include the return statements
		only in if else block as it would wait for the if condition and then only execute.
	*/
	

}

module.exports.loginUser = function(req, res){


	console.log("In login User");

	//Check if user present
	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			console.log('Err in fetching User from DB');
			return;
		}
		console.log('User is there....');
		if(user){
			//handle of password matches or not for the given email
			if(user.password != req.body.password){
				console.log('Password doesnt match, try again');
				return res.redirect('/');
			}
			//if password matches then create a cookie with the user_id as the _id that MongoDB creates
			console.log('pass and user are there....');
			res.cookie('user_id', user.id);

			//redirect the user to his profile
			res.redirect('/profile'); 
			// {
			// 	user: user	
			// });
		
		//If the user is not present after checking his email, send error that user is not present 
		}else{
			
			console.log('User not found');
			return res.redirect('/');
		}
	});	

	

}

module.exports.logout = function(req, res){

	//clear the cookie in res.cookie
	res.clearCookie('user_id');

	//take the user back to the login page
	res.redirect('/');
}