const express = require('express');
const uniqid = require('uniqid');
const cors = require('cors');

// Place Fake pour faire du contenu

const places = [
  {
    id: uniqid(),
    user: 'Selena',
    lat: 45.761629,
    lon: 4.833033,
    img: 'https://ucarecdn.com/f9ba07c4-b7f2-4077-8840-c51623434a7e/sajadnorixIjpx2dWbu8unsplash.jpg',
  },
  {
    id: uniqid(),
    name: 'Kalil',
    lat: 45.76951,
    lon: 4.867913,
    img: 'https://ucarecdn.com/d43eae4d-3722-44bb-9a74-c3d9eb658e7c/rafaljedrzejek5LROvubqo4unsplash.jpg',
  },
  {
    id: uniqid(),
    name: 'Florence',
    lat: 45.725213,
    lon: 4.884782,
    img: 'https://ucarecdn.com/3c74ecb5-4829-4b3f-a5cb-38db425f22c5/dngphchitriuhfDv8pW_uvsunsplash.jpg',
  },
  {
    id: uniqid(),
    name: 'Bastien',
    lat: 45.775715,
    lon: 4.882494,
    img: 'https://ucarecdn.com/6f125b16-cfdf-40ff-b495-f59eb5393cf6/fernandogagonfGQr5ogRPsunsplash.jpg',
  },
];

const app = express();

app.use(express.json());
app.use(cors());

app.get('/placesFree', (req, res) => {
  res.send(places);
});

app.listen(3000, () => console.log('server listening on port 3000'));
