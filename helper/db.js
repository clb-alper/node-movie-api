const mongoose = require('mongoose');


const URI = 
'mongodb+srv://dbUser:dbUser@cluster0.mkwbf.mongodb.net/movie-api?retryWrites=true&w=majority'


module.exports = () => {
  mongoose.connect(URI, {
    useUnifiedTopology :true,
    useNewUrlParser : true
  });
  console.log("db connected .. .!");

  mongoose.Promise = global.Promise;
};

