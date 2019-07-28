const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("hola wacho");
});

app.use(require("./user.routes"));
app.use(require("./list.routes"));
app.use(require('./middleware.routes'));
module.exports = app;