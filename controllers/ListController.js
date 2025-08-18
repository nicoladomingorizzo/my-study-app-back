import pool from "../db/connection.js";

// rotta index
export async function index(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// rotta store
export async function store(req, res) {
    const { title, description, due_date } = req.body;

    // validazioni
    if (!title) {
        return res.status(400).json({ error: true, message: "Il titolo è obbligatorio." });
    }
    if (title.length > 15) {
        return res.status(400).json({ error: true, message: "Il titolo non può superare i 15 caratteri." });
    }
    if (description && description.length > 50) {
        return res.status(400).json({ error: true, message: "La descrizione non può superare i 50 caratteri." });
    }

    const completed = false; // boolean, non 0

    try {
        const { rows: [newTask] } = await pool.query(
            `INSERT INTO tasks (title, description, due_date, completed)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [title.trim(), description ? description.trim() : null, due_date || null, completed]
        );

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// rotta changeStatus
export async function changeStatus(req, res) {
    const { id } = req.params;
    const { completed } = req.body; // true/false

    try {
        const { rows: [updated] } = await pool.query(
            "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
            [completed, id]
        );

        if (!updated) {
            return res.status(404).json({ error: true, message: "Task non trovato" });
        }

        res.status(200).json({
            success: true,
            message: `Task ${id} aggiornato con successo`,
            updatedStatus: updated.completed
        });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// rotta update
export async function update(req, res) {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: true, message: "ID non valido" });
    }

    const { title, description, due_date } = req.body;

    try {
        const { rows: [task] } = await pool.query(
            `UPDATE tasks
       SET title = $1, description = $2, due_date = $3
       WHERE id = $4
       RETURNING *`,
            [title.trim(), description ? description.trim() : null, due_date || null, id]
        );

        if (!task) {
            return res.status(404).json({ error: true, message: "Task non trovata" });
        }

        res.json({ success: true, message: "Task aggiornata con successo", task });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// rotta destroy
export async function destroy(req, res) {
    const { id } = req.params;
    const taskId = parseInt(id);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: true, message: "ID non valido" });
    }

    try {
        const result = await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Task non trovata" });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}
