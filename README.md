# Assignment_Antarctica_GLobal

Bacially there are two folders : Backend & Frontend

Backend :-> 
In backend there are sub-folders -> api 
                                 -> auth
                                 -> config
                                 -> node_modules
                                 -> app.js
                                 -> package-lock.json
                                 -> package.json

In api folder there is user folder where service, route and controller are made 

In auth, there is a token_validation file so that only the user having that token can only able to move ahead with the pages. This token is not required at the time of login and registration.
Once the token is generated after login it check whether that token is correct and validate it after that only person can move ahead, otherwise wont allow to move ahead.

In config file we have details to connect with DB (MySQL)

In node module file there are all the libraries that we used for this project development

app.js is the main file or a start file of this project where all the details of routes are register


Frontend :-> 
In backend there are sub-folders -> bower component
                                 -> build
                                 -> dist
                                 -> documentation
                                 -> js
                                 -> pages
                                 -> plugin
                                 -> home.html
                                 -> index.html
                                 -> register.html
                                 -> userdetail.html
                                 
here the html files are one which i want to draw attention where index.html -> login page , register.html -> registration form, userdetil.html-> all details of employees
and home.html-> only employees can see this page

Here i made a condition if a employee comes,first he needs to register then login (bydefault its role will be employee) and the user (role-> user) are person only who have the
authorisation to see the details of all the employees having role as "employee".

For login -> there is a validation if username = email_id  and password = password from DB is matched then only he will be logged in otherwise alert will prompt "invalid creds"
In registration -> emp_id is kept unique and here in our case it will be auto-generated no-deitable filed (I kept the scenario like employee is the new person without emp_id and here we are assigning it)
by this it will reduce discrepency.  

Login -> username -> ekanshbari@gmail.com (employee)
         password -> Ekansh@1
         username -> ryadav@gmail.com (user)
         password -> Ravi@123
         
   when employee logs in he will see home.html with welcome msg
   and when user logs in he will be directed to the userdetail.html page
         

In user-detail page -> only the person with role "user" (kept mannual for time being later we can control the roles as well) can see or access this page to see
all the details of employees (having role "employee") containing emp_id, first name, last name, email-id, orgainsation name can be seen 
There is also a search bar where you can search details by first name, last name , email-id or emp-id apart from that there is a pagination and show how many entries at
a time. Also we can sort the details with any of the column field.


In registration page-> person can fill the details and if any of the column is vacant alert will come, password and confirm password doesn't match then alert will be triggered,
if password doesn't follow the rules like it should be 8 to 15 in length, must contain atleast one upper, one lower, one muneric, one symbol then alert will be triggered.
and after submitting confirm box will arrive redirecting to the login page.





















