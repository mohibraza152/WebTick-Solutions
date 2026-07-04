require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();


console.log("ENV CHECK:", process.env.MONGO_URI);


// ✅ Connect to MongoDB (single connection)
connectDB();

// ✅ Middleware
app.use(cors({
    origin: '*', // your frontend URL
    credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
