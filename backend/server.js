import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRouter from "./routes/userRouter.js";
import burgerRouter from "./routes/burgerRouter.js";
import {
  favoriteRouter,
  allIngredientsRouter,
  customBurgersRouter,
  customCheeseRouter,
  customMeatRouter,
  customSauceRouter,
  customToppingRouter,
} from "./routes/customBurgersRouter.js";
import emailRouter from "./routes/emailRouter.js";
import path from "path";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  cors({
    // origin: " http://localhost:9001",
    origin: `${process.env.BASE_URL}:${process.env.PORT_REACT}`,
    credentials: true,
  })
);
dotenv.config();

connectDb();

app.use(userRouter);
app.use(burgerRouter);
app.use(emailRouter);
app.use(customBurgersRouter);
app.use(customSauceRouter);
app.use(customCheeseRouter);
app.use(customMeatRouter);
app.use(customToppingRouter);
app.use(allIngredientsRouter);
app.use(favoriteRouter);

app.get("/", function (_, res) {
  app.use(express.static(path.resolve("./../frontend", "build")));
  res.sendFile(path.resolve("./../frontend", "build", "index.html"));
});
app.listen(process.env.PORT_MONGO, () => {
  console.log(
    `Server is working on port: ${process.env.BASE_URL}:${process.env.PORT_MONGO}`
  );
});
