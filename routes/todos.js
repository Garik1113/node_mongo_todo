const { Router } = require('express');
const Todo = require('../model/Todo');
const router = Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.render('index', { title: 'Todos', todos, isIndex: true });
});
router.get('/createTodo', (req, res) => {
  res.render('create', { title: 'Create', isCreate: true });
});

router.post('/createTodo', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  await todo.save();
  res.redirect('/');
});

router.post('/completeTodo', async (req, res) => {
  const todo = await Todo.findById(req.body.id);
  todo.completed = !!req.body.completed;
  await todo.save();
  res.redirect('/');
});

module.exports = router;
