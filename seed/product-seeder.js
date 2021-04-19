let Product = require('../models/product')

let mongoose = require('mongoose');
const product = require('../models/product');

mongoose.connect('mongodb://localhost:27017/shopping', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true }, (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log("Server is connected to database...")
    }
});
let products = [
    new Product({
        imagePath: 'https://ru.wikipedia.org/wiki/%D0%9E%D1%80%D0%BB%D0%B8%D0%BD%D1%8B%D0%B5#/media/%D0%A4%D0%B0%D0%B9%D0%BB:Kampfadler_02.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    }),
    new Product({
        imagePath: 'https://en.wikipedia.org/wiki/Bear#/media/File:Ursidae-01.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    }),
    new Product({
        imagePath: '../../images/3.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    }),
    new Product({
        imagePath: '../../images/4.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    }),
    new Product({
        imagePath: '../../images/5.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    }),
    new Product({
        imagePath: '../../images/6.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    }),
    new Product({
        imagePath: '../../images/1.jpg',
        title: 'Gothic Vedio Game',
        description: 'Awesome Game !!!',
        price: 13
    })
];
let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save()
        .then(function(doc) {
            done++;
            console.log("Сохранен объект", doc);
            if (done === products.length) {
                exit();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

function exit() {
    mongoose.disconnect();
    console.log("Server is disconnected after saving data.");
}