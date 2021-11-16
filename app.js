const express = require('express');
const Joi = require('joi');
const connection = require('./db');

const serverPort = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const streetParkingSpotsRouter = express.Router();
app.use('/streetParkingSpots', streetParkingSpotsRouter);

connection.connect((err) => {
  if (err) {
    console.error('error connecting to db');
  } else {
    console.log('connected to db');
  }
});

streetParkingSpotsRouter.get('/', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM streetParkingSpots')
    .then(([results]) => {
      res.json(
        results.map((result) => {
          return {
            ...result,
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
          };
        })
      );
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving products from db.');
    });
});

streetParkingSpotsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query('SELECT * FROM streetParkingSpots WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

// streetParkingSpotsRouter.put('/:id', (req, res) => {
//   const { error: validationErrors } = Joi.object({
//     userName: Joi.string().max(255),
//     lat: Joi.number().min(0),
//     lon: Joi.number().min(0),
//     img: Joi.string().max(255),
//   }).validate(req.body, { abortEarly: false });

//   if (validationErrors)
//     return res.status(422).json({ errors: validationErrors.details });

//   connection
//     .promise()
//     .query('UPDATE streetParkingSpots SET ? WHERE id = ?', [
//       req.body,
//       req.params.id,
//     ])
//     .then(([result]) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

streetParkingSpotsRouter.post('/', (req, res) => {
  const { userName, lat, lon, img } = req.body;
  const { error: validationErrors } = Joi.object({
    userName: Joi.string().max(255).required(),
    lat: Joi.number().min(5).required(),
    lon: Joi.number().min(5).required(),
    img: Joi.string().max(255).required(),
  }).validate({ userName, lat, lon, img }, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection
      .promise()
      .query(
        'INSERT INTO streetParkingSpots (userName, lat, lon, img) VALUES (?, ?, ?, ?)',
        [userName, lat, lon, img]
      )
      .then(([result]) => {
        const createdPlaces = { id: result.insertId, userName, lat, lon, img };
        res.json(createdPlaces);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});

// streetParkingSpotsRouter.delete('/:id', (req, res) => {
//   connection
//     .promise()
//     .query('DELETE FROM streetParkingSpots WHERE id = ?', [req.params.id])
//     .then(([result]) => {
//       if (result.affectedRows) res.sendStatus(204);
//       else res.sendStatus(404);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

app.listen(serverPort);
