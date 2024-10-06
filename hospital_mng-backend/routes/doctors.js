// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors', error: err.message });
    }
});

// Add new doctor
router.post('/add', async (req, res) => {
    const { name, specialty } = req.body;

    try {
        const newDoctor = new Doctor({ name, specialty });
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ message: 'Error adding doctor', error: err.message });
    }
});

// Update doctor data
router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, specialty } = req.body;

    try {
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = name;
        doctor.specialty = specialty;

        await doctor.save();
        res.json({ message: 'Doctor updated!' });
    } catch (err) {
        res.status(400).json({ message: 'Error updating doctor', error: err.message });
    }
});

// Delete doctor by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findByIdAndDelete(id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({ message: 'Doctor deleted!' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting doctor', error: err.message });
    }
});

module.exports = router;
