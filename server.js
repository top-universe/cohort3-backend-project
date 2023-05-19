const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');



// Config
dotenv.config({path: `config/config.env`});


app.use(express.json());





// Routes




// API Calls



// Connect Database
connectDatabase();





port = process.env.PORT || 3004

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});