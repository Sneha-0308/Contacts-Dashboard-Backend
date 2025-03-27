const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();


connectDb();
const app = express();

const port = process.env.PORT;

app.use(express.json()); // this middle ware helps to read json input coming from API request body
app.use("/api/contacts",require("./routes/contactRoutes")); //this is the middleware for contact
app.use("/api/users",require("./routes/userRoutes"));//this is the middleware for user
require('./swagger')(app);
app.use(errorHandler);
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
}); 