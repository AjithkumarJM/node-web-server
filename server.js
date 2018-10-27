const fs = require('fs');

const express = require('express');
const hbs = require('hbs'); //handlebars

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('new engine', 'hbs');

// middlewares 
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    })
    next();
});

// maintanence middleware 
// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// })

// middleware for connecting html file
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('welcome.hbs', {
        pageTitle: 'Hello',
        welcomeMessage: 'welcome to my webiste.',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
