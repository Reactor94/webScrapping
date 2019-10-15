const inquirer = require('inquirer');

const fs = require('fs');

const data = fs.readFileSync('movies.json');
var jsonContent = JSON.parse(data);
var moviesArray = jsonContent.map(el => el.movieName);

inquirer
  .prompt([
   {
    type: 'confirm',
    name: 'isLike',
    message: 'Do you like wathcing movies?',
    },
    {
      type: 'list',
      name: 'moviesTypes',
      message: 'What movie would you like to chose?',
      choices: moviesArray
    }
  ])
  .then(answers => {
    console.log(answers);
  });
