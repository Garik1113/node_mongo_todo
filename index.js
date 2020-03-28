const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Router = require('./routes/todos');
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

const PORT = process.env.PORT || 3000;
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(Router);
async function startApp() {
  try {
    await mongoose.connect(
      'mongodb+srv://Garik:123456789@cluster0-lekng.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    );
    app.listen(PORT, () => {
      console.log('Sever has been started');
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
