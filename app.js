const express = require('express');
const Joi = require('joi');
const connection = require('./db');

const serverPort = process.env.PORT || 3000;
const app = express();
// const placesFreeRouter = express.Router();
// app.use('/placesFree', placesFreeRouter);

app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error('error connecting to db');
  } else {
    console.log('connected to db');
  }
});

placesFreeRouter.get('/placesFree', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM placesFree')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving products from db.');
    });
});

placesFreeRouter.get('/placesFree/:id', (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM placesFree WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

placesFreeRouter.put('/placesFree/:id', (req, res) => {
  const { error: validationErrors } = Joi.object({
    user: Joi.string().max(255),
    lat: Joi.number().min(0),
    lon: Joi.number().min(0),
    img: Joi.string().max(255),
  }).validate(req.body, { abortEarly: false });

  if (validationErrors)
    return res.status(422).json({ errors: validationErrors.details });

  connection
    .promise()
    .query('UPDATE placesFree SET ? WHERE id = ?', [req.body, req.params.id])
    .then(([result]) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

placesFreeRouter.post('/placesFree', (req, res) => {
  const { user, lat, lon, img } = req.body;
  const { error: validationErrors } = Joi.object({
    user: Joi.string().max(255).required(),
    lat: Joi.number().min(0).required(),
    lon: Joi.number().min(0).required(),
    img: Joi.string().max(255).required(),
  }).validate({ user, lat, lon, img }, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection
      .promise()
      .query(
        'INSERT INTO placesFree (user, lat, lon, img) VALUES (?, ?, ?, ?)',
        [user, lat, lon, img]
      )
      .then(([result]) => {
        const createdPlaces = { id: result.insertId, user, lat, lon, img };
        res.json(createdPlaces);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

placesFreeRouter.delete('/placesFree/:id', (req, res) => {
  connection
    .promise()
    .query('DELETE FROM placesFree WHERE id = ?', [req.params.id])
    .then(([result]) => {
      if (result.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.listen(serverPort);
