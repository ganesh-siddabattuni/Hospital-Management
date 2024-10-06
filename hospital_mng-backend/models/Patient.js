// models/Patient.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the patient schema
const patientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true, // Remove leading and trailing whitespace
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be a positive number'], // Ensure age is non-negative
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other'], // Restrict to specific values
    },
    // Add more fields as needed
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
