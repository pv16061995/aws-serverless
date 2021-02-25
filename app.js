const express = require('express')
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get("/hello", (req, res) => {
    let name = req.query.name;

    res.json({ message: "hello " + name });

});

app.listen(3000);

module.exports = app;