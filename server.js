require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// ======================
// Connect MongoDB
// ======================
connectDB();

// ======================
// Middleware
// ======================
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

// ======================
// Serve Static Files
// ======================

// Serve everything in the project folder (HTML, CSS, JS, Images, etc.)
app.use(express.static(path.join(__dirname)));

// ======================
// API Routes
// ======================
app.use('/api/auth', require('./routes/auth'));

// ======================
// Home Route
// ======================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ======================
// 404 Handler
// ======================
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});