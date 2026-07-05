require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API Routes
app.use('/api/auth', require('./routes/auth'));

// ======================
// HTML Pages
// ======================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/'));
});

app.get('/aiagents', (req, res) => {
    res.sendFile(path.join(__dirname, '/aiagents'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/login'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup'));
});

app.get('/policy', (req, res) => {
    res.sendFile(path.join(__dirname, '/policy'));
});

app.get('/t&c', (req, res) => {
    res.sendFile(path.join(__dirname, '/T&C'));
});

app.get('/lead_form', (req, res) => {
    res.sendFile(path.join(__dirname, '/lead_form'));
});


// 404

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});