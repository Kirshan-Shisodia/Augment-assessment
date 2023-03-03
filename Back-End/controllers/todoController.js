const Todo = require('../models/Todo');

// create a new todo item for a user
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = new Todo({
      title,
      description,
      userId: req.user.userId,
    });

    await newTodo.save();

    res.status(201).json({ message: 'Todo item created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// get all todo items for a user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort('-createdAt');

    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// update a todo item for a user
exports.updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    if (todo.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this todo item' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    await todo.save();

    res.status(200).json({ message: 'Todo item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// delete a todo item for a user
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo item not found' });
    }

    if (todo.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this todo item' });
    }

    await todo.remove();

    res.status(200).json({ message: 'Todo item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
