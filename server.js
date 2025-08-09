//importo express
const express = require('express');
//inizializzo express
const app = express();
//creo la porta
const PORT = process.env.PORT;
//importo listRouter
const listRouter = require('./routes/ListRouter');
//importo handleServerError middleware
const handleServerError = require('./middlewares/handleServerError');
//importo notFoundError middleware
const notFoundError = require('./middlewares/NotFoundError');

//dichiaro il body parser
app.use(express.json());

//installo cors
const cors = require('cors');

//inizializzo cors
app.use(cors());

//dichiaro le rotte del router
app.use('/api/tasks', listRouter);

//inizializzo il get
app.get('/', (req, res) => {
    res.send('Welcome to my To-do List')
});

//uso la middleware handleServerError
app.use(handleServerError);

//uso la middleware notFoundError
app.use(notFoundError);

//server in ascolto
app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
});