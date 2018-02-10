# TODO App (Back-end)

Web application for record and track your todo list (API)
You also can filter todo list by priority and difficulty

#
#

Todo list application using : 
```diff
1. OAuth (To get data from Facebook token)
2. JSON Web Token
3. Mongo DB and Mongoose ODM 
```

#
#

## Models

```diff
Collection : User 
Attribute  : name, email, [todo_id]

Collection : Todo 
Attribute  : name, priority_level, difficulty_level, deadline, status, user_id
```
#
#

#### Level Category :
| Name | 1 | 2 | 3 |
|-------|------|-------------|---------|
| Priority | High| Medium | Low |
| Difficulty | Hard | Medium | Easy |


#
#

## ROUTES

### User Routes
| Route | HTTP | Description | Request | Response |
|-------|------|-------------|---------|----------|
|`/user` | POST | Create / Get a user | Body : user_data | JWT |
|`/user` | PUT | Edit User data | Headers : JWT, Body : new_user_data | new_user_data |
|`/user` | DELETE | Delete user | Headers : JWT | response_code |

### Todo Routes
| Route | HTTP | Description | Request | Response |
|-------|------|-------------|---------|----------|
|`/todo` | POST | Create a todo | Headers : JWT, Body : todo_data | response_code |
|`/todo/id/:todo_id` | GET | Get user todo | Headers : JWT, Params : todo_id | todo_data |
|`/todo/id/:todo_id` | PUT | Edit todo data | Headers : JWT, Params : todo_id, Body : todo_data | new_todo_data |
|`/todo/id/:todo_id` | DELETE | Delete todo | Headers : JWT, Params : todo_id | response_code |
|`/todo/list` | GET | Get user todo list | Headers : JWT | todo_list |
|`/todo/list/priority?` | GET | Get user todo list | Headers : JWT, Query : priority_level  | todo_list (by priority) |
|`/todo/id/:todo_id/done` | PUT | Mark as Done todo | Headers : JWT, Params : todo_id | response_code |
|`/todo/id/:todo_id/undone` | PUT | Undo Mark as Done todo | Headers : JWT, Params : todo_id | response_code |

# 

## Install Project
Using terminal :
```diff
1. npm install
```

# 

## Run Application
Using terminal :
```diff
nodemon app.js
```