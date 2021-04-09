const express = require("express");
const router = require("./routers/router");
const connectDB = require("./configs/db");
require ("dotenv").config()

const app = express();
const port = process.env.port;
  
connectDB();
 
// Memanggil middleware
app.use(express.urlencoded({extended: true }));
app.use(router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});