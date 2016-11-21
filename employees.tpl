<!DOCTYPE html>
<html>
<head>
    
</head>
<body>

    <h1>EMPLOYEES MANAGER</h1>
    
    <p>
        Insert a new Employee:  <button> click to insert</button>
    </p>
    
    <p>  Search employee by ID:</p>
    <form action="http://localhost:1337" method="post">
        <input name="idForSearching" />
        <button type="button" onclick="submit()">Send Form</button>
    </form>
    
    <p>  Delete an employee by ID:</p>
    <form action="http://localhost:1337" method="post">
        <input name="idForDeleting" />
        <button type="button" onclick="submit()">Send Form</button>
    </form>
    
    
    <form (:if[idTrovato] ~
        [:then ~ style="display:block":]
        [:else ~ style="display:none" :]
          :)>
        Information about the searched Employee: <br>
        Name: <input value=(:name:)> <br>
        Surname: <input value=(:surname:)> <br>
        Level: <input value=(:level:)> <br>
        Salary: <input value=(:salary:)> <br>
    </form>
    
    <form (:if[idSearchedButNotFound] ~
        [:then ~ style="display:block":]
        [:else ~ style="display:none" :]
          :)
          >
        
        No employee found with the specified id: <br>
        Name: <input > <br>
        Surname: <input> <br>
        Level: <input > <br>
        Salary: <input> <br>
    </form>
        
    
</body>

</html>