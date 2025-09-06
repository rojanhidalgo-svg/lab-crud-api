const db = require('../db');

// CREATE
exports.createStudent = (req, res) => {
  const { name, email, course, year_level } = req.body;
  if (!name || !email || !course || !year_level) {
    return res.status(400).json({ message: "All fields required" });
  }
  const sql = "INSERT INTO students (name, email, course, year_level) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, course, year_level], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Email already exists" });
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ id: result.insertId, name, email, course, year_level });
  });
};

// READ (All)
exports.getAllStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// READ (By ID)
exports.getStudentById = (req, res) => {
  db.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json(results[0]);
  });
};

// UPDATE
exports.updateStudent = (req, res) => {
  const { name, email, course, year_level } = req.body;
  db.query("UPDATE students SET name=?, email=?, course=?, year_level=? WHERE id=?", 
    [name, email, course, year_level, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
    res.json({ id: req.params.id, name, email, course, year_level });
  });
};

// DELETE
exports.deleteStudent = (req, res) => {
  db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  });
};
