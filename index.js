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
    let users = await User.find({});
    // let theUser = users.toObject();
    let userArr = users.map(user => user.toObject());
    
    res.render('index', {userArr});
})

app.post('/', async (req, res) => {

    let { name, email, password } = req.body;
    const user = new User({
        name, 
        email, 
        password
    })
    if (await User.exists({ name: name }) || await User.exists({ email: email})) {
        console.log('exists already')
    }
    else {
        console.log('not here yet.')
        await user.save();
    }
    
    res.redirect('/')
})

app.post('/delete/users/:id', async (req, res) => {
    await User.findOneAndRemove(req.params.id, {})
    res.redirect('/')
})

app.listen(PORT || 3000, () => {
    console.log(`server listening on ${PORT}`);
})