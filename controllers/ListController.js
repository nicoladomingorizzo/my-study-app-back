//importo connection
const connection = require('../db/connection')

//definisco le rotte che andrò ad usare in router

//rotta index
function index(req, res) {
    const sql = 'SELECT * FROM tasks';
    connection.execute(sql, (err, result) => {
        if (err) return res.status(500).json({
            errore: true,
            message: err.message
        });
        res.json(result)
    })
}

//rotta store
function store(req, res) {
    //recupero parametri da inserire
    const { title, description, due_date } = req.body;
    // Controllo di validazione di base per i campi richiesti
    if (!title) {
        return res.status(400).json({
            error: true,
            message: 'Il titolo della task è obbligatorio.'
        });
    };
    //creo una costante che mi serve ad inserire una nuova cosa da fare nella lista, i valori sono 3 (?, ?, ?)
    const insertTaskSql = 'INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)';
    connection.execute(insertTaskSql, [title.trim(), description.trim(), due_date], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })
        const newTask = {
            id: result.insertId,
            title: title.trim(),
            description: description ? description.trim() : null,
            due_date: due_date || null
        }
        //restituisco lo stato 201 per conferma di aggiunta di task corretta
        res.status(201).json(newTask);
    });

}



//esporto il controller
module.exports = {
    index,
    store
}