import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectmongo from 'connect-mongo';
import passport from './passport.js';
import path from 'path';
import User from './models/user';

// mongodb connection
mongoose.connect('mongodb://localhost:27017/database', () => {
	console.log('Connected to mongodb...');
});

const MongoStore = connectmongo(session);

// app init
const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../front')));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'asadlfjadçfkjalkdjalfkdjalkfd',
  store: new MongoStore({
	url: 'mongodb://localhost:27017/databaseSession',
	cookie: {
		maxAge: 518400000
	},
	autoReconnect: true,
	clear_interval: 3600
  })
}));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', (req, res) => {

  res.sendfile('front/index.html')
});

app.get('/admin/dashboard', (req, res) => {
	if(req.user) {
			res.sendfile('front/admin/dashboard.html');
	} else {
		res.sendfile('front/login.html');
	}

});

app.get('/signup', (req, res) => {
	res.sendfile('front/signup.html');
});

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

app.get('/login', (req, res) => {
	res.sendfile('front/login.html');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



export { app };
