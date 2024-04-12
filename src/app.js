const express = require('express');
const { createUserController, getAll, userValidation, getPerID } = require('./controllers/user.controller');
const { createCategoryController, getCategoriesController } = require('./controllers/categories.controller');
const authenticateToken = require('./middlewares/auth.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());


app.post('/login', createUserController);

app.get('/user', authenticateToken, getAll);

app.post('/user', userValidation);

app.get('/user/:id', authenticateToken, getPerID);

app.post('/categories', authenticateToken, createCategoryController);

app.get('/categories', authenticateToken, getCategoriesController);

// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`

module.exports = app;
