const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const founderRoutes = require('./routes/founderRoutes');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static('public'));

app.use(session({
  secret: 'mySuperSecretKey123',
  resave: false,
  saveUninitialized: true
}));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('./public/uploads', express.static('uploads'));

// Routes
app.use('/', founderRoutes);

// Server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
