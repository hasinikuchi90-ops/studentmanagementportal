const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

const Student = mongoose.model('Student', StudentSchema);

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Get all students
app.get('/students', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// Add student
app.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

// Update student
app.put('/students/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

// Server start
app.listen(5000, () => {
  console.log("Server started on port 5000");
});