const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("hola wacho");
});

app.use(require("./user.routes"));

module.exports = app;