import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());


app.post("/api/students", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    if (!req.body.id || !req.body.name) {
        return res.status(400).json({
            message: "ID and name are required"
        });
    }

    students.push(req.body);

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.status(201).json({
        message: "Student added successfully!",
        data: req.body
    });
});



app.get("/api/students", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    res.status(200).json({
        message: "Students fetched successfully!",
        data: students
    });
});



app.put("/api/students/:id", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students[index] = {
        ...students[index],
        ...req.body
    };

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.status(200).json({
        message: "Student updated successfully!",
        data: students[index]
    });
});



app.delete("/api/students/:id", (req, res) => {

    let students = JSON.parse(fs.readFileSync("students.json"));

    const id = parseInt(req.params.id);

    const newStudents = students.filter(student => student.id !== id);

    if (students.length === newStudents.length) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    fs.writeFileSync("students.json", JSON.stringify(newStudents, null, 2));

    res.status(200).json({
        message: "Student deleted successfully!"
    });
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});