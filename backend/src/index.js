const puppeteer = require('puppeteer');
const fs = require('fs');

const websiteUrl = 'https://www.imdb.com/chart/top?ref_=ft_250';

 const scrapper = (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(websiteUrl);

    const movies = await page.$$('.lister-list tr');

    const moviesPromises = await movies.map(async movie => {
        const movieName = await movie.$eval('td.titleColumn', el => el.innerText.slice(0, -7).replace(/^\d+\.\s*/, ''));
        const movieYear = await movie.$eval('td .secondaryInfo', el => parseInt(el.innerText.slice(1, -1)));
        const movieRate = await movie.$eval('.imdbRating', el => parseFloat(el.innerText));

        return {
            movieName,
            movieYear,
            movieRate,
        };

    });

    const moviesData = await Promise.all(moviesPromises);
    const filteredMovies = moviesData.filter(movie => movie.movieYear > 1995 && movie.movieRate > 8);

    fs.writeFileSync('./movies.json', JSON.stringify(filteredMovies));

});

// const data = fs.readFile('movies.json');
// const jsonContent = JSON.parse(data);
// // const moviesNameArray = jsonContent.map(el => el.movieName);
// const moviesRate = jsonContent.map(el => el.movieRate)
module.exports = {scrapper};