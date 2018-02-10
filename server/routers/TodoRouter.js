const express = require('express');
const TodoController = require ('../controllers/TodoController.js');

const router = express.Router();


router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodoById);
router.put('/', TodoController.editTodo);
router.delete('/', TodoController.deleteTodo);
router.get('/list', TodoController.getTodoList);


module.exports = router;