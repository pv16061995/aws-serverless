const express = require('express')
const app = express();
const bodyParser=require('body-parser');
const { mongoose } =require('./db.js');
var EmployeeController =require('./controllers/employees');


app.use(bodyParser.json());



app.use('/employees',EmployeeController);

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get("/hello", (req, res) => {
    let name = req.query.name;

    res.json({ message: "hello " + name });

});



app.listen(3000,()=>console.log('Server started with port : 3000'));


module.exports = app;