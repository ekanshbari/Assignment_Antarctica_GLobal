

function login(){
  
  var xmlhttp = new XMLHttpRequest();
  var username = document.getElementById("exampleInputUsername").value;
  var password = document.getElementById("exampleInputPassword1").value;
  if (username === "" || password === "") {
    alert("Fill all the entries");
  } 
  else {
            
          username=username.toLowerCase();
                
            
    var url = "http://localhost:4001/api/users/login/";

    let loginDetails ={
      email : username,
      password: password
    }
    var myArr;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        myArr = JSON.parse(this.responseText);
        
        if (myArr.success === 0) {

          Lobibox.alert('warning', {
            msg: 'Invalid credentials',
            buttons: ['ok'],
            buttons: {
                ok: {
                    'class': 'btn btn-warning'
                }
            }            
            });
        }
        else if(myArr.success === 1) {
                                
            localStorage['userEmail']=myArr.data.email_id;
            localStorage['fullName']=myArr.data.f_name+" "+myArr.data.l_name;
            
            localStorage['token']=myArr.token;

            if(myArr.data.roles === "employee"){
              document.location.href="home.html"
            }
            else{
              document.location.href="userdetail.html"
            }            
    }
       
      }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.setRequestHeader(
        "Cache-Control",
        "no-cache, no-store , must-revalidate"
      );
      xmlhttp.send(JSON.stringify(loginDetails));
    
}
}


function saveDetails(){

  let userData={
    emp_id:"",
    f_name:"",
    l_name:"",
    email_id:"",            
    organisation_name:"",
    password:""    
};

var firstName=document.getElementById('Firstname').value.toString();
var lastName=document.getElementById('lastname').value.toString();
var email=document.getElementById('exampleInputUsername').value.toString();
email=email.trim();
var empID=document.getElementById('empID').value.toString();
var orgName=document.getElementById('OrganisationName').value.toString();
var password=document.getElementById('exampleInputPassword1').value.toString();
var password2=document.getElementById('exampleInputPassword2').value.toString();

let checkpass = CheckPassword();

if(firstName==="" || lastName==="" || email==="" || empID==="" || orgName==="" || password==="" || password2==="" ){
    
    $('#myModalAlert').modal('show');    
    document.getElementById('alertBox').innerHTML="Fill all the entries!!!";
}
else if(password!=password2){
    
    $('#myModalAlert').modal('show');
    document.getElementById('alertBox').innerHTML="Passwords donot match. Try again!!!";
}
else if(!checkpass){
  $('#myModalAlert').modal('show');
    document.getElementById('alertBox').innerHTML="Password must contain atleast 8 to 15 character, one uppercase, one lowerase, one numeric & one special character !!!";
}

else{
       
            userData.emp_id=empID;
            userData.f_name=firstName;
            userData.l_name=lastName;
            userData.email_id=email;            
            userData.organisation_name=orgName;
            userData.password=password2;
            console.log(userData);
        
var url = "http://localhost:4001/api/users/create";
var myArr1;
var xmlhttp1 = new XMLHttpRequest();
xmlhttp1.onreadystatechange = function() {
if (this.readyState === 4 && this.status === 200) {
myArr1 = JSON.parse(this.responseText);
console.log(myArr1);

  Lobibox.alert('warning', {
    msg: 'You have registered successfully. Try logging in',
    buttons: ['ok'],
    buttons: {
        ok: {
            'class': 'btn btn-warning'
        }
    },
    callback: function(lobibox, type){
        if (type === 'ok'){
                document.location.href="index.html";
        }
    }
    
    });

    }   

}
xmlhttp1.open("POST", url, true);
xmlhttp1.setRequestHeader("Content-Type", "application/json");
xmlhttp1.setRequestHeader(
"Cache-Control",
"no-cache, no-store , must-revalidate"
);
xmlhttp1.send(JSON.stringify(userData));
}
}


function getDataForEmployee(){
    let userdetails={
        username:"test"
      };
    var xmlhttp = new XMLHttpRequest();
     var url = "http://localhost:4001/api/users/";
     var myArr;
     xmlhttp.onreadystatechange = function() {
       if (this.readyState === 4 && this.status === 200) {
         myArr = JSON.parse(this.responseText);
         console.log(JSON.stringify(myArr.data.length));
         document.getElementById('employeeDetails').innerHTML="";
        var userTableBody=document.getElementById('employeeDetails');
        userTableBody.classList.add("table", "table-bordered", "table-hover")

          var thead = document.createElement('thead');
          var tr=document.createElement('tr');

          var th=document.createElement('th');
          th.innerHTML="Employee ID";
          tr.appendChild(th);

          var th=document.createElement('th');
         th.innerHTML="First Name";
         tr.appendChild(th);
         
         var th=document.createElement('th');
         th.innerHTML="Last Name";
         tr.appendChild(th);
         
         var th=document.createElement('th');
         th.innerHTML="Email ID";         
         tr.appendChild(th);
 
         var th=document.createElement('th');
         th.innerHTML="Organisation Name";         
         tr.appendChild(th);

  thead.appendChild(tr);
  userTableBody.appendChild(thead)

  var tbody = document.createElement('tbody');
     
     for(var i=0;i<myArr.data.length;i++){
       var tr=document.createElement('tr');
       
        
         var td=document.createElement('td');
         td.innerHTML=myArr.data[i].emp_id;
         tr.appendChild(td);
 
         var td=document.createElement('td');
         td.innerHTML=myArr.data[i].f_name;
         tr.appendChild(td);
         
         var td=document.createElement('td');
         td.innerHTML=myArr.data[i].l_name;
         tr.appendChild(td);
         
         var td=document.createElement('td');
         td.innerHTML=myArr.data[i].email_id;         
         tr.appendChild(td);
 
         var td=document.createElement('td');
         td.innerHTML=myArr.data[i].organisation_name;         
         tr.appendChild(td);

         tbody.appendChild(tr);

     }
     userTableBody.appendChild(tbody);

     $('#employeeDetails').DataTable({searching: false, paging: true, info: true});
             
       }
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.setRequestHeader("Authorization", "Bearer "+localStorage.getItem("token"));
          xmlhttp.send(); 
 
 }
 

 function CheckPassword() 
{ 
  var pass = document.getElementById("exampleInputPassword1");
var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
if(pass.value.match(decimal)) 
{ 
return true;
}
else
{ 
return false;
}
} 

function filterRecord(){
  document.getElementById("clearFilter").style.visibility = "visible";
  $('#employeeDetails').DataTable().destroy();
  var val = document.getElementById("searchField").value;
  var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:4001/api/users/"+ val ;
    var myArr;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        myArr = JSON.parse(this.responseText);
        document.getElementById('employeeDetails').innerHTML="";
        // console.log(JSON.stringify(myArr.data.length));
        console.log(JSON.stringify(myArr));
        var userTableBody=document.getElementById('employeeDetails');
        userTableBody.classList.add("table", "table-bordered", "table-hover")
   
        var thead = document.createElement('thead');
        var tr=document.createElement('tr');
   
        var th=document.createElement('th');
        th.innerHTML="Employee ID";
        tr.appendChild(th);
   
        var th=document.createElement('th');
            th.innerHTML="First Name";
            tr.appendChild(th);
            
            var th=document.createElement('th');
            th.innerHTML="Last Name";
            tr.appendChild(th);
            
            var th=document.createElement('th');
            th.innerHTML="Email ID";         
            tr.appendChild(th);
    
            var th=document.createElement('th');
            th.innerHTML="Organisation Name";         
            tr.appendChild(th);
   
     thead.appendChild(tr);
     userTableBody.appendChild(thead)
   
     var tbody = document.createElement('tbody');
        
        for(var i=0;i<myArr.data.length;i++){
          var tr=document.createElement('tr');
          
           
            var td=document.createElement('td');
            td.innerHTML=myArr.data[i].emp_id;
            tr.appendChild(td);
    
            var td=document.createElement('td');
            td.innerHTML=myArr.data[i].f_name;
            tr.appendChild(td);
            
            var td=document.createElement('td');
            td.innerHTML=myArr.data[i].l_name;
            tr.appendChild(td);
            
            var td=document.createElement('td');
            td.innerHTML=myArr.data[i].email_id;         
            tr.appendChild(td);
    
            var td=document.createElement('td');
            td.innerHTML=myArr.data[i].organisation_name;         
            tr.appendChild(td);
   
            tbody.appendChild(tr);
   
           //  userTableBody.appendChild(tr);
        }
        userTableBody.appendChild(tbody);
   
        $('#employeeDetails').DataTable({searching: false, paging: false, info: true})
        
        
       
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Authorization", "Bearer "+localStorage.getItem("token"));
    xmlhttp.send();
}

function clearFilter(){
  window.location.reload();
}

function getLastEmpID(){
  
  var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:4001/api/users/getLastEmpID";
    var myArr;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        myArr = JSON.parse(this.responseText);
        console.log(myArr.data[0].emp_id)
        document.getElementById("empID").value=parseInt(myArr.data[0].emp_id)+1;

      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
