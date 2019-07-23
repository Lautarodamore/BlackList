const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');

require("dotenv").config({ path: '.env' });

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
.then(() => console.log(">>>>>DB IS CONNECTED"))
.catch(e => console.log(e));

mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(require("./routes/index"));

app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});