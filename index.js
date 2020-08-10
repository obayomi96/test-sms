const express = require('express');
const bodyParser = require('body-parser');
const smsCleint = require('./sms');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const users = [];

app.post('/send', (req, res) => {
  const { name, phonenumber } = req.body;
  const newUser = {
    name,
    phonenumber
  };

  users.push(newUser);

  const smsText = `Hi ${newUser.name}, this is to verify your number for testing!`

  smsCleint(phonenumber, smsText);

  res.status(201).send({
    message: `Welcome ${newUser.name}, check your mobile for confirmation!`,
    data:  newUser
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000 !`);
});

module.exports = app;
