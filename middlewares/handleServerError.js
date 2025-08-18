// middlewares/handleServerError.js
export default function handleServerError(err, req, res, next) {
    console.error("Server error:", err);
    res.status(500).json({ error: true, message: "Errore interno del server" });
}
