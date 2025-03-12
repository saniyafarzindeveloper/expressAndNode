import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import connectDB from "./db/database.js";
import userRouter from './routes/user.js'
import todoRouter from './routes/todo.js'
const app = express();


dotenv.config();
connectDB();

//middlewares to parse api json responses
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
//middleware for api endpoint - user route
app.use("/api/v1/user", userRouter);

//todo middleware
app.use("/api/v1/todo", todoRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
