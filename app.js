const express = require('express');
const uniqid = require('uniqid');
const cors = require('cors');

const users = [
  { id: 1, name: 'user1', message: 'message 1' },
  { id: 2, name: 'user2', message: 'message 2' },
];

const app = express();

app.use(express.json());
app.use(cors());

app.get('/myCollection', (req, res) => {
  console.log('handling /myroute');
  res.send(users);
});

app.post('/users', (request, response) => {
  const { name, message } = request.body;
  const newUser = { name, message, id: uniqid() };
  newUser.push(newUser);
  response.send(newUser);
});

app.listen(5000, () => console.log('server listening on port 5000'));