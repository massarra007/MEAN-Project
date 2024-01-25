// 1
const mongoose = require('mongoose');
// 2
mongoose.connect( 'mongodb+srv://massarra:3inginlog1@angular.uvk1xbj.mongodb.net/' )
    .then(
        ()=>{
            console.log('Connected to the Database !');
        }
    )
    .catch(
        ()=>{
            console.log('error in connection');
        }
    )

// 3
module.exports = mongoose;