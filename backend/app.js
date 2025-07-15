const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const userRoutes = require('./routes/user');
const packageRoutes = require('./routes/package');
const destinationRoutes = require('./routes/destination');

app.use('/users', userRoutes);
app.use('/packages', packageRoutes);
app.use('/destinations', destinationRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/traveldb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
