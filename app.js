const express = require('express');
const Joi = require('joi');
const connection = require('./db');

const serverPort = process.env.PORT || 5001;
const app = express();
app.use(express.json());

const ratingsRouter = express.Router();
app.use('/ratings', ratingsRouter);



connection.connect((err) => {
  if (err) {
    console.error('error connecting to db');
  } else {
    console.log('connected to db');
  }
});


ratingsRouter.get('/', (req, res) => {
  connection.promise().query('SELECT * FROM ratings')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving ratings from db.');
    });
});

/*
ratingsRouter.get('/', (req, res) => {

  connection.promise()
    .query('SELECT * FROM ratings')
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});
*/
ratingsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.promise()
    .query('SELECT * FROM ratings WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length) {
        res.json(results[0]);
      } else {
        res.sendStatus(404);
      }
    });
});





//  ajout de produit

ratingsRouter.post('/', (req, res) => {
  const { name, message, note } = req.body;
  const { error: validationErrors } = Joi.object({
    name: Joi.string().max(255).required(),
    message: Joi.string().max(65535).required(),
    note: Joi.number().min(0).required(),
  }).validate({ name, message, note }, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection.promise()
      .query('INSERT INTO ratings (name, message, note) VALUES (?, ?, ?)', [name, message, note])
      .then(([result]) => {
        res.send({ id: result.insertId, name, message, note });

      }).catch((err) => { console.error(err); res.sendStatus(500); });
  }
});

// update
ratingsRouter.patch('/:id', (req, res) => {
  const { error: validationErrors } = Joi.object({
    name: Joi.string().max(255),
    message: Joi.string(),
    note: Joi.number().min(0),
  }).validate(req.body, { abortEarly: false });

  if (validationErrors) {
    res.status(422).json({ errors: validationErrors.details });
  } else {
    connection.promise()
      .query('UPDATE ratings SET ? WHERE id = ?', [req.body, req.params.id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
});



// delete

ratingsRouter.delete('/:id', (req, res) => {
  connection.promise()
    .query('DELETE FROM ratings WHERE id = ?', [req.params.id])
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