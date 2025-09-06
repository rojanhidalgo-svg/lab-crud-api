const db = require("../db");

// Create Course
exports.createCourse = (req, res) => {
  const { code, title, units } = req.body;
  if (!code || !title || !units) {
    return res.status(400).json({ message: "All fields are required" });
  }
  db.query("INSERT INTO courses (code, title, units) VALUES (?, ?, ?)",
    [code, title, units],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Course code already exists" });
        }
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ id: result.insertId, code, title, units });
    });
};

// Get All
exports.getCourses = (req, res) => {
  db.query("SELECT * FROM courses", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get by ID
exports.getCourseById = (req, res) => {
  db.query("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Course not found" });
    res.json(results[0]);
  });
};

// Update
exports.updateCourse = (req, res) => {
  const { code, title, units } = req.body;
  db.query(
    "UPDATE courses SET code=?, title=?, units=? WHERE id=?",
    [code, title, units, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Course not found" });
      res.json({ message: "Course updated successfully" });
    }
  );
};

// Delete
exports.deleteCourse = (req, res) => {
  db.query("DELETE FROM courses WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  });
};
