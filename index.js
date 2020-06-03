const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect(`${process.env.DatabaseURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

app.get('/', async (req, res) => {
    // let users = {}
    User.find({}, function (err, users) {
        
        res.render('index', { users: users })
    });
    // res.render('index');
})

app.listen(PORT || 3000, () => {
    console.log(`server listening on ${PORT}`);

})