const asyncHandler = require('express-async-handler') 
const Todo = require('../models/todoModel')
//  @desc Get todos
//  @Route Get /api/todos
//  @access  public
const getTodos = asyncHandler(async(req, res)=>{
   const todos = await Todo.find()
    res.status(200)
    res.json(todos)
}
)
//  @desc Create todos
//  @Route Post /api/todos
//  @access  public
const createTodos = asyncHandler( async(req, res)=>{
    if(!req.body.text && !req.body.place){
        res.status(400)
        throw new Error('please add a text field')
    }
    const todo =  await Todo.create(
        { 
            text: req.body.text
           
        }
    )

    res.status(200)
    res.json(todo)
}
)

//  @desc update todos
//  @Route /api/todos:id
//  @access  public
const updateTodos = asyncHandler( async(req, res)=>{
    const todo = await Todo.findById(req.params.id)
    if(!todo){
        res.status(400)
        throw new Error('Todo not found')
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200)
    res.json(updatedTodo)
}
)
//  @desc Delete todos
//  @Route Delete /api/todos:id
//  @access  public
const deleteTodos = asyncHandler( async(req, res)=>{
    const todo = await Todo.findById(req.params.id)
    if(!todo){
        res.status(400)
        throw new Error ('Goal not found')}

    todo.remove()
    res.json({id : req.params.id})    
    
    
}
)
module.exports = {
    getTodos,
    createTodos,
    updateTodos,
    deleteTodos
}