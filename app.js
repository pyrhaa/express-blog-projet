//dotenv module to read .env secret file
require('dotenv').config();
//return a function express
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app return object
const app = express();

//connect to mongodB, return a promise if success listen port 3000
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) =>
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    })
  )
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
