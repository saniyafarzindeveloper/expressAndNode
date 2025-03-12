import express from 'express';
import { createTodo, getAllTodos, updateTodoById } from '../controllers/todo.js';
const router = express.Router();

router.route("/").post(createTodo);
router.route("/").get(getAllTodos);
router.route("/:todoId").put(updateTodoById);

export default router;