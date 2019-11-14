const fs = require('fs');
const moviesScrapper = require('./index');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('../src/database/database');
const config = require('../src/config/config');

app.use(cors());
moviesScrapper.scrapper();
const data = fs.readFileSync(path.join(__dirname, 'public/movies.json'));

app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/movies', (req, resp, next) => {
  let jsonContent = JSON.parse(data);

  if (req.query.fromYear) {
    jsonContent = jsonContent.filter(el => el.movieYear > req.query.fromYear);
  }

  if (req.query.movieYear) {
    jsonContent = jsonContent.filter(el => el.movieYear == req.query.movieYear);
  }

  if (req.query.fromRating) {
    jsonContent = jsonContent.filter(
      el => el.movieRate >= req.query.fromRating,
    );
  }

  if (req.query.name) {
    jsonContent = jsonContent.filter(el => el.movieName == req.query.name);
  }

  resp.send(jsonContent);
  next();
});

console.log(process.env.MONGODB_USER);

app.listen(config.PORT, () => {
  console.log(config.PORT);
});
