const express = require('express');
const app = express();

app.get("/", (req, res) => {
    password = "ewrerere"
    res.json("hello world");
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
