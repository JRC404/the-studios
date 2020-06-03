# the studios

the social profile for anyone - 

## mongoDB setup walkthrough

1.

```
cd Documents
mkdir mongodbintro
cd mongodbintro
npm init -y
npm i express express-handlebars mongoose
```

2.

```
mongodbintro
│   index.js
│   readme.md
│
└───lib
│      API.js
│
└───models
│      user.js
│
└───public
│      style.css
│
└───views
│   └───layouts
│          layout.hbs
│   index.hbs
```

3. Inside user.js:

```javascript
const mongoose = require(‘mongoose’);

const user = new mongoose.Schema({ 
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    password: {type: String, required: true}
});

module.exports = mongoose.model(‘users’, user);

```
