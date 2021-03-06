const express = require("express");
const db = require("./config/database");
const path = require("path");
const pug = require('pug');
const bodyParser = require('body-parser');
var sequelize = require('sequelize');

const Op = sequelize.Op;

// Load in db, connection stored in ./config/database.js
db.authenticate()
   .then(() => console.log("Database connected"))
   .catch(err => console.log(err))

const app = express();
// store all html files in ./public
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
   res.status("200").send("Works");
});

app.use("/courses", require("./routes/courses"));
app.use("/ratings", require("./routes/ratings"));
app.use("/comments", require("./routes/comments"));

const PORT = process.env.PORT || 40001;
const server =app.listen(PORT, console.log(`Server started on port ${PORT}`));
require('./socket/socket.js')(server)
