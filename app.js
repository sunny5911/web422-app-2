var HTTP_PORT = 3000;
var express = require("express");
var app = express();
const path = require('path');
const router = express.Router();
app.use('/js', express.static(path.join(__dirname, '/js/main.js')))
app.use('/css', express.static(path.join(__dirname, '/css/main.css')))
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/', router);
app.listen(HTTP_PORT);