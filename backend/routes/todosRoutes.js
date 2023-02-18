

const express =  require('express')
const { getTodos, createTodos, updateTodos, deleteTodos } = require('../controller/todosController')
const router =  express.Router()

router.route('/').get(getTodos).post(createTodos)
router.route('/:id').put(updateTodos).delete(deleteTodos)


module.exports = router