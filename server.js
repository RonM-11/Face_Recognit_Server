const express = require ('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  }
});

app.use(express.json());
app.use(cors());

/* 1 */
app.get('/', (req, res) =>{
	res.send("It's working");
})

/* 2 */
app.post('/signin', signin.handleSignin(db, bcrypt));

/* 3 */
app.post('/register', register.handleRegister(db, bcrypt));

/* 4 */
app.get('/profile/:id', profile.handleProfileGet(db));

/* 5 */
app.put('/image', image.handleImage(db));


app.post('/imageurl', image.handleApiCall(db));


app.listen(process.env.PORT || 3001, () =>{
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> Get = user
/image --> PUT --> user
*/