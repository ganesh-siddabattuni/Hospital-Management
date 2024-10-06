// models/Appointment.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the appointment schema
const appointmentSchema = new Schema({
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true,
    },
    doctorName: {
        type: String,
        required: [true, 'Doctor name is required'],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        validate: {
            validator: (value) => value > Date.now(),
            message: 'Appointment date must be in the future',
        },
    },
    // Add more fields as needed
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
