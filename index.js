const puppeteer = require('puppeteer');
const websiteUrl = 'https://www.imdb.com/chart/top?ref_=ft_250';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(websiteUrl);
  
  const movies = await page.$$('.lister-list tr');

  
  const moviesData = movies.map(async movie =>{
    const movieName = await movie.$$('td.titleColumn').innerText;
    const movieYear = await movie.$$('td .secondaryInfo').innerText;
    const movieRate = await movie.$$('.imdbRating').innerText;

    return {
        movieName,
        movieYear,
        movieRate,
      };

  });

 
  console.log(await Promise.all(moviesData));

})();