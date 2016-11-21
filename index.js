//modules
var express = require('express');
var bodyParser = require('body-parser');
var bind = require('bind');
var formidable = require('formidable');
var util = require('util');

/**
 *@brief object constructor function to be used to create employee object
 *@param id,name,surname,level,salary; information about the employee
 */
function employee(Id,Name,Surname,Level,Salary){
    this.id=Id;
    this.name=Name;
    this.surname=Surname;
    this.level=Level;
    this.salary=Salary;
}

//list of employees
var employees = [];

//
employees[0]=new employee(123,'qwerty','asdf',1,123);

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

//set port
app.set('port', (process.env.PORT || 1337));

app.use('/', function(req,res){
    //bind to template
    
    if(req.method.toLowerCase()=='get'){
        
	   bind.toFile('employees.tpl', 
	   {
            //set up parameters
            //for now, no id has been searched, (and also found)
            idSearchedButNotFound:false,
            idTrovato:false,
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else if(req.method.toLowerCase()=='post'){
        if(typeof req.body !== 'undefined' && req.body){
            //console.log('sono in body');
            if(typeof req.body.idForSearching !== 'indefined' && req.body.idForSearching){
                searchEmployee(res,req,req.body.idForSearching);
            }
        }
        else{
            console.log('uns')
            res.end('undefined form');
        }
    }
    
    
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/**
 *@brief It searches for an employee with the specified id passed as parameter
 *@param res,req,idSearched Response of the server, Request of the server, the id with witch search the employee
 *return nothing
 */
function searchEmployee(res, req, idSearched){
    var i;
    //loop for searching the index i, of the employee with the specified id
    for(i=0 ; i<employees.length; i++){
        if(employees[i].id==idSearched) {break;}
    }
    //if the index is less than the length of the list of the employyees, an employees has been found with the specified id, so the page will show a form compiled with all the informations about the employee
    if(i<employees.length){
        //give the template the informations, it will show the in a form
        bind.toFile('employees.tpl', 
	   {
            //the id has been found
            idSearchedButNotFound:false,
            idTrovato:true,
            id: idSearched,
            name: employees[i].name,
            surname: employees[i].surname,
            level: employees[i].level,
            salary: employees[i].salary,
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    //otherwise, it will just show an empty form
    else{
        //tell the template that no employee has been found
        bind.toFile('employees.tpl', 
	   {
            //the id has been searched annd not found
            idSearchedButNotFound:true,
            idTrovato:false,
        
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
}