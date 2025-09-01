import express from "express";
import mysql from "mysql2";

const router = express.Router();

// 🔹 configure with your MySQL credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mayida@786123",  // SQLpassword
  database: "eventdb"
});

db.connect(err => {
  if (err) console.error("❌ DB connection failed:", err);
  else console.log("✅ MySQL connected");
});

// GET all events
router.get("/", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST a new event
router.post("/", (req, res) => {
  const { name, date, location } = req.body;
  db.query(
    "INSERT INTO events (name, date, location) VALUES (?, ?, ?)",
    [name, date, location],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, date, location });
    }
  );
});

export default router;
