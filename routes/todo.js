import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodoById,
  deleteTodo,
} from "../controllers/todo.js";
const router = express.Router();

router.route("/").post(createTodo);
router.route("/").get(getAllTodos);
router.route("/:todoId").put(updateTodoById);
router.route("/:todoId").delete(deleteTodo);

export default router;
