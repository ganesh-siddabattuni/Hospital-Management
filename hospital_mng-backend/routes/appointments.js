const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new appointment
router.post('/add', async (req, res) => {
    const { patientName, doctorName, date } = req.body;
    
    // Create a new Appointment instance
    const newAppointment = new Appointment({ patientName, doctorName, date });
    
    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);  // Status 201 for resource creation
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update appointment data
router.post('/update/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Update the fields
        appointment.patientName = req.body.patientName || appointment.patientName;
        appointment.doctorName = req.body.doctorName || appointment.doctorName;
        appointment.date = req.body.date || appointment.date;

        const updatedAppointment = await appointment.save();
        res.status(200).json({ message: 'Appointment updated!', updatedAppointment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an appointment
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
