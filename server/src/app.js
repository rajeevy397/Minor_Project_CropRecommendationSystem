const express = require('express');
const app = express();
require('./db/conn');
const cors = require('cors');
const { collection } = require('./db/conn');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  try {
    const user = await collection.findOne({ email: loginEmail });
    if (user) {
      if (user.password === loginPassword) {
        res.json('exist');
      }else{
        res.json('WrongPassword')
      }
    } else {
      res.json('notExist');
    }
  } catch (e) {
    console.log(e);
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const data = {
    name: name,
    email: email,
    password: password,
  };
  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json('exist');
    } else {
      res.json('notExist');
      await collection.insertMany([data]);
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
