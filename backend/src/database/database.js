const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('./models/User');

mongoose.connect(config.MONGODB_URI, {
  dbName: config.MONGODB_DBNAME,
  user: config.MONGODB_USER,
  pass: config.MONGODB_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  User.findOne({ name: 'Vitalik' }).then(user => {
    // if(document){
    //   //run scrapperm save to database, return
    // }
    console.log(user);
  });
  // const user = new User({
  //   name: 'Vitalik',
  //   email: 'v.pylypets94@gmail.com',
  // });
  // user.save();
});
