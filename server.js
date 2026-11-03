
const express = require('express');
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Student records
let students = [];

// POST API
app.post('/api/students', (req, res) => {

    const student = req.body;

    // Validate mandatory fields
    if (
        student.id === undefined ||
        !student.name ||
        !student.email ||
        !student.course ||
        student.age === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Store student
    students.push(student);

    // Send response
    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
