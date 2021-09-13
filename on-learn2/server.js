const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyparser = require('body-parser');
require("dotenv").config();

//stripe
var Publishable_Key = 'your-Publishable_Key'
var Secret_Key = 'your-Secret_Key'

const stripe = require('stripe')(Secret_Key)

app.use(bodyparser.urlencoded({
  extended: false
}))
app.use(bodyparser.json())

app.get('/mypage', function (req, res) {
  res.render('mypage', {
    key: Publishable_Key
  })
})

app.post('/payment', function (req, res) {

  stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: 'name',
      address: {
        line1: '',
        postal_code: '',
        city: '',
        state: '',
        country: '',
      }
    })
    .then((customer) => {

      return stripe.charges.create({
        amount: 7000, // Charing Rs 25 
        description: 'Web Development Product',
        currency: 'USD',
        customer: customer.id
      });
    })
    .then((charge) => {
      res.redirect('/myvideo');
    })
    .catch((err) => {
      res.send(err)
    });

});

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'))
app.use(express.static('assets'));
app.use('/images', express.static('images'));
app.use('/routes', express.static('routes'));
app.use('/views', express.static('views'));
app.use('/someJS', express.static('someJS'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

mongoose.connect("your-mondodb-uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.listen(process.env.PORT || 4000, function () {
  console.log('server is running');
});

const trainerSchema = {
  trainerName: String,
  courseName: String,
  cost: String,
  num: String
}
const Trainer = mongoose.model('Trainer', trainerSchema);

app.get('/aboutUs', (req, res) => {
  Trainer.find({}, function (err, trainers) {

    res.render('aboutUs', {
      trainerList: trainers
    })

  })
});


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/index', (req, res) => {
  res.render('index');
});


app.get('/blog', (req, res) => {
  res.render('blog');
});
app.get('/article1', (req, res) => {
  res.render('article1');
});
app.get('/article2', (req, res) => {
  res.render('article2');
});
app.get('/article3', (req, res) => {
  res.render('article3');
});
app.get('/article4', (req, res) => {
  res.render('article4');
});
app.get('/article5', (req, res) => {
  res.render('article5');
});
app.get('/article6', (req, res) => {
  res.render('article6');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/trainer1', (req, res) => {
  res.render('trainer1');
});
app.get('/trainer2', (req, res) => {
  res.render('trainer2');
});
app.get('/trainer3', (req, res) => {
  res.render('trainer3');
});
app.get('/trainer4', (req, res) => {
  res.render('trainer4');
});
app.get('/trainer5', (req, res) => {
  res.render('trainer5');
});
app.get('/trainer6', (req, res) => {
  res.render('trainer6');
});
app.get('/mypage', (req, res) => {
  res.render('mypage');
});
app.get('/myvideo', (req, res) => {
  res.render('myvideo');
});
const userSchema = {
  username: String,
  email: String,
  password: String
}
const User = mongoose.model('User', userSchema);

app.post('/register', function (req, res) {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save();
  res.redirect('/login');
});


//login denemeleri
app.post('/login', function (req, res) {
  User.find({}, function (err, users) {
    if (req.body.email || req.body.password) {
      res.redirect('/mypage');
    }
  })
});
