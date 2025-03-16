import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
    try {
       const {title, description} = req.body 
       if(!title || !description){
        return res.status(403).json({
            success: false,
            message: "All fields are required",
          });
       }

       const todo = new Todo({title, description});
       todo.save(); 
       return res.status(201).json({
        success: true,
        message: "Todo created successfully!",
        todo
      });
    } catch (error) {
        console.log(error)
    }
}


//fetching all todos
export const getAllTodos = async(req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos)
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully!",
      todos: todos.length === 0 ? [] : todos

    });

  } catch (error) {
    console.log(error);
  }
}

export const updateTodoById = async (req, res) =>{
  try {
    const todoId = req.params.todoId;
    const {title} = req.body;
    const todo = await Todo.findByIdAndUpdate(todoId, title, {new:true});
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully!",
      todo
    });

  } catch (error) {
    console.log(error)
  }
}
export const deleteTodo = async (req, res) =>{
  try {
    const todoId = req.params.todoId;
  await Todo.findByIdAndDelete(todoId); 
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    console.log(error)
  }
}