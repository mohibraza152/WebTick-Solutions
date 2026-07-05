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
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/aiagents', (req, res) => {
    res.sendFile(path.join(__dirname, 'aiagents.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'policy.html'));
});

app.get('/t&c', (req, res) => {
    res.sendFile(path.join(__dirname, 'T&C.html'));
});

app.get('/lead_form', (req, res) => {
    res.sendFile(path.join(__dirname, 'lead_form.html'));
});

// Optional pages

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'payment.html'));
});

app.get('/marketing_automation', (req, res) => {
    res.sendFile(path.join(__dirname, 'marketing_automation.html'));
});

app.get('/saas_payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'saas_payment.html'));
});

app.get('/web_landing-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'web_landing-page.html'));
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