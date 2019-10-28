const http = require('http');
const fs = require('fs');
const urlParser = require('url');
const moviesScrapper = require('./index');
const queryString = require('query-string');

moviesScrapper.scrapper();
const data = fs.readFileSync('movies.json');

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My movies</title></head>');
    res.write('<body>Hello</body>');
    res.write('</html>');
    res.end();
  }

  const path = urlParser.parse(req.headers.host + req.url);

  if (path.pathname === '/movies') {
    const params = queryString.parse(path.query);

    let jsonContent = JSON.parse(data);

    if (params.fromYear) {
      jsonContent = jsonContent.filter(el => el.movieYear > params.fromYear);
    }

    if (params.movieYear) {
      jsonContent = jsonContent.filter(el => el.movieYear == params.movieYear);
    }

    if (params.fromRating) {
      jsonContent = jsonContent.filter(el => el.movieRate >= params.fromRating);
    }

    if (params.name) {
      jsonContent = jsonContent.filter(el => el.movieName == params.name);
    }

    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(jsonContent));

    res.end();
  }
});

server.listen(4000);
