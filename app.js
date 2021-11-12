const express = require('express');
const uniqid = require('uniqid');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
// Place Fake pour faire du contenu

const places = [
  { id: uniqid(), user: 'Manon', lat: 45.761629, lon: 4.833033 },
  { id: uniqid(), name: 'Tiphaine', lat: 45.76951, lon: 4.867913 },
  { id: uniqid(), name: 'Thibault', lat: 45.725213, lon: 4.884782 },
];

//
app.get('/placesFree', (req, res) => {
  res.send(places);
});

app.listen(5001, () => console.log('server listening on port 5001'));
