const express = require('express');
const server = express();
const connectToDB = require('./config/database.js');
const router=require("./routes.js");
require('dotenv').config({path: "config/.env"});
server.use(express.json());
server.use(router);




// connectToDB();

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});