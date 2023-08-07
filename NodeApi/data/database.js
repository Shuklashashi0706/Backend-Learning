import mongoose from "mongoose";
import {config} from "dotenv";
config({
  path:"./data/config.env"
})
//connecting database
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then(() => console.log("Database Connected"))
    .catch((e) => {
      console.log(e);
    });
};
