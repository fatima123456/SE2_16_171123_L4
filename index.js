//modules
var express = require('express');
var bodyParser = require('body-parser');
var bind = require('bind');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

//set port
app.set('port', (process.env.PORT || 1337));

app.use('/', function(req,res){
    //bind to template
	bind.toFile('employees.tpl', 
	{
        //set up parameters
        
    }, 
    function(data) 
    {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});