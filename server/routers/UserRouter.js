const express = require('express');
const UserController = require ('../controllers/UserController.js');

const router = express.Router();


router.post('/', UserController.createUser);
router.get('/', UserController.getUserById);
router.put('/', UserController.editUser);
router.delete('/', UserController.deleteUser);


module.exports = router;