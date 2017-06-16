import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectmongo from 'connect-mongo';
import passport from 'passport';
import User from './models/user';

// mongodb connection
mongoose.connect('mongodb://localhost:27017/database', () => {
	console.log('Connected to mongodb...');
});

const MongoStore = connectmongo(session);

// app init
const app = express();

// middleware
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

app.get('/', (req, res) => {

  const newUser = new User({
    username: 'bla',
    password: 'blu'
  });

  newUser.save((err, data) => {
    console.log(err);
  });

  res.sendfile('front/index.html')

});

app.get('/admin/dashboard', (req, res) => {
  res.sendfile('front/admin/dashboard.html');
});

export { app };
