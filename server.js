//importo express
const express = require('express');
//inizializzo express
const app = express();
//creo la porta
const PORT = process.env.PORT;
//importo listRouter
const listRouter = require('./routes/ListRouter');

//dichiaro il body parser
app.use(express.json());

//dichiaro le rotte del router
app.use('/api/tasks', listRouter);

//inizializzo il get
app.get('/', (req, res) => {
    res.send('Welcome to my To-do List')
});

//server in ascolto
app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`)
});