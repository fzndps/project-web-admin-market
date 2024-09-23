const express = require('express');
const db = require('./connection');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

db.connect(err => {
   if (err) {
      console.error('Error connecting to MYSQL :', err);
   } else {
      console.log('Connected to MYSQL');
   }
});

app.post('/login', (req, res) => {
   const { username, password } = req.body;

   const sql = 'SELECT * FROM register WHERE username = ?, password = ?'
   db.query(sql, [username, password], (reject, resolve) => {
      if (reject) {
         return res.status(500).send('Error during login')
      }
      if (resolve.length > 0) {
         res.send('Login successfull')
      } else{
         res.status(401).send('Invalid username or password')
      }
   })
});

app.post('/register', (req, res) => {
   const { full_name, username, email, password } = req.body;

   const sql = 'INSERT INTO register (full_name, username, email, password) VALUE (?, ?, ?, ?)'

   db.query(sql, [full_name, username, email, password], (reject, resolve) => {
      if (reject) {
         return res.status(500).send('Eror saving user to database')
      }
      res.send('User registered successfully')
   })
})

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});