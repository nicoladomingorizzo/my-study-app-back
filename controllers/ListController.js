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

    if (title && title.length > 15) {
        return res.status(400).json({
            error: true,
            message: 'Il titolo non può superare i 15 caratteri.'
        });
    };

    if (description && description.length > 50) {
        return res.status(400).json({
            error: true,
            message: 'La descrizione non può superare i 50 caratteri.'
        });
    };
    //const completed
    const completed = 0;
    //creo una costante che mi serve ad inserire una nuova cosa da fare nella lista, i valori sono 4 (?, ?, ?, ?)
    const insertTaskSql = 'INSERT INTO tasks (title, description, due_date, completed) VALUES (?, ?, ?, ?) ;';
    connection.execute(insertTaskSql, [title.trim(), description.trim(), due_date, completed], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        })
        const newTask = {
            id: result.insertId,
            title: title.trim(),
            description: description ? description.trim() : null,
            due_date: due_date || null,
            completed
        }
        //restituisco lo stato 201 per conferma di aggiunta di task corretta
        res.status(201).json(newTask);
    });

}

//rotta changeStatus
function changeStatus(req, res) {
    //recupero parametri da inserire
    const { id } = req.params;
    const { completed } = req.body;
    const changeStatusSql = 'UPDATE `tasks` SET `completed` = ? WHERE `id` = ?;';
    connection.execute(changeStatusSql, [completed, id], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: true,
                message: "Task non trovato"
            });
        }

        res.status(200).json({
            success: true,
            message: `Task ${id} aggiornato con successo`,
            updatedStatus: completed
        });
    });

}

//rotta update
function update(req, res) {
    //recupero id e parametri
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: true, message: 'ID non valido' });
    }
    const { title, description, due_date } = req.body;
    const tasksSql = 'UPDATE tasks SET title = ?, description= ?, due_date = ? WHERE id = ? ;';
    connection.execute(tasksSql, [title.trim(), description.trim(), due_date, parseInt(id)], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        });
        res.json({ success: true, message: 'Task aggiornata con successo' })
    });
}

//rotta destroy
function destroy(req, res) {
    //recupero l'id
    const { id } = req.params;
    const taskId = parseInt(id);
    if (isNaN(taskId)) {
        return res.status(400).json({
            error: true,
            message: 'ID non valido'
        });
    }
    const deleteTask = 'DELETE FROM tasks WHERE id = ? ;';
    connection.execute(deleteTask, [parseInt(id)], (err, result) => {
        if (err) return res.status(500).json({
            error: true,
            message: err.message
        });
        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: true,
                message: 'Not found'
            });
        };
        res.sendStatus(204)
    });
};


//esporto il controller
module.exports = {
    index,
    store,
    changeStatus,
    update,
    destroy
}