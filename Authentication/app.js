const express = require('express');
const mongoose = require('mongoose');
const auth_routes = require('./routes/auth_routes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Users');
    console.log(`Connected to mongoDB host ${conn.connection.host}`);
  } catch (error) {
    console.log( error.message );
  }

}

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/Users';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result) => app.listen(5000))
//   .catch((err) => console.log(err));


mongoose.connection.on( 'disconnected', () => { 
  console.log('Server has disconnected.');
  process.exit(1);
});

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(auth_routes);

app.listen(5000, () => { 
  connectDB();
  console.log(`app listening on port 5000`); 
});