import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("Connexion établie"))
    .catch(() => console.log("Connexion impossible"));
};

export default connectDb;