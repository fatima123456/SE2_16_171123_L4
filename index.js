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

//
var opened=false;

//list of employees
var employees = [];

//variables for testing the searching feature
employees[0]=new employee(345678,'Arianna','Giuliani',1,123);
employees[1]=new employee(123456,'Mario','Rossi',1,1234);
employees[2]=new employee(789012,'Diego','Bianchi',1,123);

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
            insertRequested:false,
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else if(req.method.toLowerCase()=='post'){
        console.log('sono in post');
        if(typeof req.body !== 'undefined' && req.body){
            console.log('sono in body');
            if(typeof req.body.idForSearching !== 'undefined' && req.body.idForSearching){
                searchEmployee(res,req,req.body.idForSearching);
            }
            else if(typeof req.body.idForDeleting !== 'undefined' && req.body.idForDeleting){
                deleteEmployee(res,req,req.body.idForDeleting);
            }
            else if(typeof req.body.ins !== 'undefined'){
                console.log('sono dentro');
                bind.toFile('employees.tpl', 
	           {
                    //set up parameters
                    //no id has been searched, (and also found)
                    idSearchedButNotFound:false,
                    idTrovato:false,
                    insertRequested:true,
                }, 
                function(data) 
                {
                    //write response
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                });
            }
            else if(typeof req.body.insertedName !== 'undefined' && req.body.insertedName &&typeof req.body.insertedSurname !== 'undefined' && req.body.insertedSurname &&typeof req.body.insertedSalary !== 'undefined' && req.body.insertedSalary &&typeof req.body.insertedLevel !== 'undefined' && req.body.insertedLevel &&typeof req.body.insertedId !== 'undefined' && req.body.insertedId ){
                insertEmployee(res,req,req.body.insertedName,req.body.insertedSurname,req.body.insertedSalary,req.body.insertedLevel,req.body.insertedId);
            }
            else{
                console.log('uns')
                res.end('undefined form');
            }
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
/**
 *@brief Deletes the i-th element in the list of employee, and updates the list
 *@param i index of the element that has to be deleted
 *return nothing
 */
function deleteItem(i){
    if(employees.length>0){
    for(var j=i; j<employees.length-1; j++){
        console.log(employees[j].id);
        employees[j].id=employees[j+1].id;
        employees[j].name=employees[j+1].name;
        employees[j].surname=employees[j+1].surname;
        employees[j].level=employees[j+1].level;
        employees[j].salary=employees[j+1].salary;
        console.log(employees[j].id);
    }
    employees.length-=1;
    }
}


/**
 *@brief It searches for an employee with the specified id passed as parameter, and then it deletes it.
 *@param res,req,idSearched Response of the server, Request of the server, the id with witch search the employee to  delete
 *return nothing
 */
function deleteEmployee(res, req, idSearched){
    var i;
    //loop for searching the index i, of the employee with the specified id
    for(i=0 ; i<employees.length; i++){
        if(employees[i].id==idSearched) {break;}
    }
    //if the index is less than the length of the list of the employyees, an employees has been found with the specified id
    if(i<employees.length){
        //delete the found employee
        deleteItem(i);
    }
    bind.toFile('employees.tpl', 
   {
        //there is no need to show any further information
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

/**
 * @brief Sets the display of the html element to block.
 * @param Id of the element to show.
 *return nothing
 */
function insertEmployee(res,req,insertedName,insertedSurname,insertedSalary,insertedLevel,insertedId){
    var em =new employee();
    em.id=insertedId;
    em.name=insertedName;
    em.surname=insertedSurname;
    em.level=insertedLevel;
    em.salary=insertedSalary;
    
    employees.push(em);
    
    bind.toFile('employees.tpl', 
	   {
            //set up parameters
            //for now, no id has been searched, (and also found)
            idSearchedButNotFound:false,
            idTrovato:false,
            insertRequested:false,
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
}