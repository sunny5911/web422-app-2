var HTTP_PORT = 3000;
var express = require("express");
var app = express();
const path = require('path');
const router = express.Router();
app.use(express.static('public'))
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/', router);
app.listen(HTTP_PORT);