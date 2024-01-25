const express = require('express');
const mongoose = require('./config/connect.js');
const articleApi = require('./routes/article.js');
const userApi = require('./routes/user.js');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
//http://127.0.0.1:3000

app.use('/article', articleApi);
app.use('/user', userApi);
app.use( '/getimage' , express.static('./upload')  );


app.listen(  
    3000 
    ,
    ()=>{
        console.log('Server is working !');
    }
    
);