const express = require('express');
const app = express();
const product = require('./routers/products');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
let shoes;
let searchMode=false;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());


app.set('view engine', 'ejs');
app.use('/products', product)
app.use(express.static(path.join(__dirname, 'public')));

//get home page
app.get('/home', (req, res) => {
    console.log(req.url);
    
    if(searchMode){
        res.render('pages/home', {shoes});
        searchMode=false;
    }else{
        fs.readFile('./db/list.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                 shoes = JSON.parse(data);
                res.render('pages/home', {shoes});
            }
        })    
    }   
})

//get about page
app.get('/about', (req, res) => {
    res.render('pages/about');
})

// get cantact page
app.get('/contact', (req, res) => {
    res.render("pages/contact");
})

// search route
app.post('/search', (req, res) => {
    fs.readFile('./db/list.json', 'utf8', function (err, data) {
        let reqArray = [];
        if (err) {
            res.send('error')
        } else {
            let shoe = JSON.parse(data);
            for (i = 0; i < shoe.length; i++) {
                for (const key in shoe[i]) {
                    if (shoe[i][key] === req.body) {
                        reqArray.push(shoe[i]);
                    }
                }
            }
            shoes=reqArray;
            searchMode=true;
            res.send(reqArray);
           
        }
    })
})

app.listen(8060);
console.log("server is listening");