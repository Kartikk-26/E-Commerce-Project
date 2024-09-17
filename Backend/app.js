const express = require('express');
const app = express();
const dbConnect = require('./db');
const validator = require('validator');
const colors = require('colors'); // Ensure you have installed the 'colors' package

const PORT = 3000;
dbConnect(); // Call the Mongoose connection

app.use(express.json())
app.use('/api', require('./routes/userRoutes'));

app.listen(PORT, () => {
    console.log(colors.magenta(`Server is running on port ${PORT}`)); // Fixing the parentheses and using 'colors'
});
