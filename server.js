const express = require('express');
const db = require('./connection');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const bcrypt = require('bcrypt');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.post('/register', (req, res) => {
   const { username, email, password } = req.body;
   bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
         return res.status(500).send('Error hashing password')
      }
      const sql = 'INSERT INTO register ( username, email, password) VALUES (?, ?, ?)'

      db.query(sql, [username, email, hashedPassword], (reject, resolve) => {
         if (reject) {
            return res.status(500).send('Eror saving user to database')
         }
         res.send('User registered successfully')
      })
   })
})

db.connect(err => {
   if (err) {
      console.error('Error connecting to MYSQL :', err);
   } else {
      console.log('Connected to MYSQL');
   }
});

app.post('/login', (req, res) => {
   const { username, password } = req.body;
   const sql = 'SELECT * FROM register WHERE username = ?';

   db.query(sql, [username], (reject, resolve) => {
      if (reject) {
         return res.status(500).send('Error querying database');
      }
      if (resolve.length === 0) {
         return res.status(401).send('Invalid username or password');
      }

      const user = resolve[0];
      const hashedPassword = user.password;

      bcrypt.compare(password, hashedPassword, (reject, resolve) => {
         if (reject) {
            return res.status(500).send('Error comparing password');
         }
         if (resolve) {
            res.status(200).send('Login successful');
         } else {
            res.status(401).send('Invalid username or password')
         }
      })
   })
});

app.get('/dashboard', (req, res) => {
   res.send('Welcome to your dashboard');
});


app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});