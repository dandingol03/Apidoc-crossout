/**
 * Created by outstudio on 16/6/28.
 */
/**
 * Created by dandi_000 on 2016/6/27.
 */

var express = require('express')
var app = require('express')();
var static = require("express-static");
var bodyParser=require('body-parser');


app.use(static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send("have fun!");
});

/**
 * fetch component
 */
app.get("/generate/apiDoc.do",function(req,res) {

});

app.listen(9002);