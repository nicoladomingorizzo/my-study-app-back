// routes/tasks.js
import express from "express";
import {
    index,
    store,
    changeStatus,
    update,
    destroy
} from "../controllers/ListController.js";

const router = express.Router();

router.get("/", index);                // lista tasks
router.post("/", store);               // crea task
router.patch("/:id/status", changeStatus); // cambia stato (completed)
router.put("/:id", update);            // aggiorna task
router.delete("/:id", destroy);        // elimina task

export default router;