// models/Doctor.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the doctor schema
const doctorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true, // Remove leading and trailing whitespace
    },
    specialty: {
        type: String,
        required: [true, 'Specialty is required'],
        trim: true, // Remove leading and trailing whitespace
    },
    // Add more fields as needed
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
