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
var fs=require('fs');
var Pattern=require('./node/pattern/Pattern');


app.use(static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine","ejs");

//Todo tomorrow

app.get('/', function (req, res) {
    var arr=new Array();
    arr.push('a','b');
    res.render("index",{"title":"test"});
});


/**
 * fetch component
 */
app.get("/generate/apiDoc.do/:componentName",function(req,res) {
    try {
        //var user_name=req.body.user;
        var content=fs.readFileSync('./components/basic/'+req.params.componentName,'utf-8');
        //fs.writeFileSync('./log.txt',content,'utf8');
        //var files=fs.readdirSync('./components/basic');
        //files.map(function(filename,i) {
        //   console.log('filename==='+filename);
        //});
        var params=new Object();
        params.comment=Pattern.comment(content);
        params.Pattern= Pattern.author(content);
        params.description=Pattern.description(content);
        params.example= Pattern.example(content);
        var propertyMaps=Pattern.properties(content).split(",");
        var property=new Object();
        property.id=propertyMaps[0];
        property.type=propertyMaps[1];
        property.description=propertyMaps[2];
        params.property=property;
        res.render("index",params);
    } catch (err) {
        err.message =  err.message;
        throw err;
    }
});

app.listen(9003);