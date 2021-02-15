const express = require('express');
const app = express();
const postgres = require('./postgres.js');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.static('public'))

const todoController = require('./controllers/todo.js');
app.use('/todo', todoController);

postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
})
