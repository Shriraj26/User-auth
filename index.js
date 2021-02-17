//1 - Basic Server Creation
//2 - Setup routes and controller
//3 - Set the View Engine to EJS
//4 - Setup Static assets
//5 - Test the DB if connected or not
//6 - Tell the index.js that we use urlencoded to get the client data
//7 - Cookies

//1
const express = require('express');

//7
const cookieParser = require('cookie-parser');

//1
const port = 8000;
const app = express();

//6
app.use(express.urlencoded());  
//7
app.use(cookieParser());


//2 
app.use('/', require('./routes'));

//3
app.set('view engine', 'ejs');
app.set('views', './views');

//4
app.use(express.static('./assets'));

//5
const db = require('./config/mongoose');

//1
app.listen(port, function(err){
	if(err){
		console.log('Server failed to start');
	}
	console.log('Server running successfully');
})

