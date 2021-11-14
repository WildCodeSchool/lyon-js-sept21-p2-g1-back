const connection = require('./db-config');
const express = require('express');
const app = express();

const port = process.env.SERVER_PORT || 3000;

// const uniqid = require('uniqid');

// Place Fake pour faire du contenu

// verification de la connexion à la database
connection.connect((err) => {
  if (err) {
    console.error(`error connecting:  ${err.stack}`);
  } else {
    console.log(`connected to db + ${connection.threadId}`);
  }
});

// pour qu'express puisse lire le json
app.use(express.json());

// recuperer données de la database
app.get('/api/placeFree', (req, resp) => {
  connection.query('SELECT * FROM placesFree', (err, result) => {
    if (err) {
      resp.status(500).send('error retrieving data');
    } else {
      resp.status(200).json(result);
    }
  });
});

// We listen to incoming request on the port defined above
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// route pour créer une nouvelle entrée dans movies
app.post('/api/placeFree', (req, resp) => {
  const { name, lat, lon, img } = req.body;
  connection.query(
    'INSERT INTO placesFree(name, lat, lon, img, ) VALUES (?, ?, ?, ?, ?)',
    [name, lat, lon, img],
    (err, result) => {
      if (err) {
        resp.status(500).send('error');
      } else {
        resp.status(201).send('new entry saved');
      }
    }
  );
});
