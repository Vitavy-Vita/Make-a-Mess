import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://make-a-mess.vercel.app",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);
dotenv.config();

connectDb();

app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port: ${process.env.BASE_URL}`);
});

