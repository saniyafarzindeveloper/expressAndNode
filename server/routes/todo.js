import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodoById,
  deleteTodo,
} from "../controllers/todo.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/").post(isAuthenticated , createTodo);
router.route("/").get(getAllTodos);
router.route("/:todoId").put(isAuthenticated, updateTodoById);
router.route("/:todoId").delete(isAuthenticated , deleteTodo);

export default router;
