const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require('fs');
require('dotenv').config();

const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
.then(() => console.log("DB CONNECTED"))
.catch(err => {
    console.log(`DB CONNECTION ERROR: ${err}`);
})

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware
// readdirSync("./routes").map((r)=> app.use("/api", require('./routes/' + r)))
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`))