const mongoose = require('mongoose');

// Define the Profile Schema (for embedded document)
const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    }
});

// Define the User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    roles: {
        type: [String],
        default: ['user'],
        enum: ['user', 'admin', 'moderator']
    },
    profile: ProfileSchema,
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Add a pre-save middleware to update the updatedAt timestamp
UserSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;