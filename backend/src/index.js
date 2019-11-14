const puppeteer = require('puppeteer');
const fs = require('fs');

const websiteUrl = 'https://www.imdb.com/chart/top?ref_=ft_250';

const scrapper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(websiteUrl);

  const movies = await page.$$('.lister-list tr');

  const moviesPromises = await movies.map(async movie => {
    const movieName = await movie.$eval('td.titleColumn', el =>
      el.innerText.slice(0, -7).replace(/^\d+\.\s*/, ''),
    );
    const movieYear = await movie.$eval('td .secondaryInfo', el =>
      parseInt(el.innerText.slice(1, -1)),
    );
    const movieRate = await movie.$eval('.imdbRating', el =>
      parseFloat(el.innerText),
    );

    return {
      movieName,
      movieYear,
      movieRate,
    };
  });

  const moviesData = await Promise.all(moviesPromises);
  const filteredMovies = moviesData.filter(
    movie => movie.movieYear > 1995 && movie.movieRate > 8,
  );
  fs.writeFileSync('./public/movies.json', JSON.stringify(filteredMovies));

  await page.click('.table-row:last-child a');
  await page.waitForSelector('.lister-list tr');
  const lovestMovies = await page.$$('.lister-list tr');

  const lovestMoviesPromise = await lovestMovies.map(async movie => {
    const movieName = await movie.$eval('td.titleColumn', el =>
      el.innerText.slice(0, -7).replace(/^\d+\.\s*/, ''),
    );
    const movieYear = await movie.$eval('td .secondaryInfo', el =>
      parseInt(el.innerText.slice(1, -1)),
    );
    const movieRate = await movie.$eval('.imdbRating', el =>
      parseFloat(el.innerText),
    );

    return {
      movieName,
      movieYear,
      movieRate,
    };
  });

  const lovestMoviesData = await Promise.all(lovestMoviesPromise);
  //   const lovestFilteredMovies = lovestMoviesData.filter(
  //     movie => movie.movieYear > 1995 && movie.movieRate > 8,
  //   );
  fs.writeFileSync(
    './public/lovestMovies.json',
    JSON.stringify(lovestMoviesData),
  );
};

module.exports = { scrapper };
