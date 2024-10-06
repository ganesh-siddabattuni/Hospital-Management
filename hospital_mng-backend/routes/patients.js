// routes/patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching patients', error: err.message });
    }
});

// Add new patient
router.post('/add', async (req, res) => {
    const { name, age, gender } = req.body;

    try {
        const newPatient = new Patient({ name, age, gender });
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json({ message: 'Error adding patient', error: err.message });
    }
});

// Update patient data
router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, gender } = req.body;

    try {
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.name = name;
        patient.age = age;
        patient.gender = gender;

        await patient.save();
        res.json({ message: 'Patient updated!' });
    } catch (err) {
        res.status(400).json({ message: 'Error updating patient', error: err.message });
    }
});

// Delete patient by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted!' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting patient', error: err.message });
    }
});

module.exports = router;
