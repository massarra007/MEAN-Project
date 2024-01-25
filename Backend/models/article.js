const mongoose = require('mongoose');


const Article = mongoose.model( 'Article' , {
title: {
    type: String
},
idUser: {
    type: String
},
description: {
    type: String
},
date: {
    type: String
},
image: {
    type: String
},
categorie: {
    type: Array
},
createdAt: {
    type: Date,
    default: Date.now // Set the default value to the current date
}
} );

module.exports = Article;