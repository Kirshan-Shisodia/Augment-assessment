const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');
const { protectAdminRoute, checkUserRole } = require('../middlewares/authMiddleware');

// Routes for authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

// Routes for client todo list
router.post('/todos', checkUserRole([1]), todoController.createTodoList);
router.get('/todos', checkUserRole([1]), todoController.getTodoList);

// Routes for admin todo list
router.get('/admin/todos', protectAdminRoute, todoController.getAdminTodoList);

module.exports = router;
