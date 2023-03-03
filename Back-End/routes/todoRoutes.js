// Import required modules
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

// Get TODO list of all clients (admin only)
router.get('/admin-list', auth, async (req, res) => {
  try {
    if (req.user.role !== 0) {
      return res.status(401).json({ msg: 'Unauthorized access' });
    }

    const todos = await Todo.find({ user: { $ne: null } }).sort({ date: -1 });

    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get TODO list of the logged-in client user
router.get('/client-list', auth, async (req, res) => {
    try {
      if (req.user.role !== 1) {
        return res.status(401).json({ msg: 'Unauthorized access' });
      }
  
      const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
  
      res.json(todos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
