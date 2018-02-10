# TODO App

Web application for record and track your todo list

#
#

Todo list application using : 
```diff
1. OAuth2 (Login with Facebook)
2. JSON Web Token
3. Mongo DB and Mongoose ODM 
```

#
#

## ROUTES

### User Routes
| Route | HTTP | Description | Request | Response |
|-------|------|-------------|---------|----------|
|`/user` | POST | Create a user | Body : user_data | JWT |
|`/user` | GET | Get user data | Body : email, password | JWT | 
|`/user` | PUT | Edit User data | Headers : JWT, Body : user_data | new_user_data |
|`/user` | DELETE | Delete user | Headers : JWT | response_code |

### Todo Routes
| Route | HTTP | Description | Request | Response |
|-------|------|-------------|---------|----------|
|`/todo` | POST | Create a todo | Headers : JWT, Body : todo data | response_code |
|`/todo` | GET | Get user todo (response : JWT) | Headers : JWT, Params : todo_id | todo_data |
|`/todo` | PUT | Edit todo data | Headers : JWT, Body : user_data | new_todo_data |
|`/todo` | DELETE | Delete todo | Headers : JWT, Body : Body : todo_id | response_code |
|`/todo/list` | GET | Get user todo list | Headers : JWT | todo_list |

# 

## Install Project
using terminal :
```diff
1. cd server
2. npm install
```

# 

## Run Application
using terminal :
```diff
nodemon app.js
```