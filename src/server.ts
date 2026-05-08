console.log("Bismillah");
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
import mongoose from "mongoose";
import app from "./app";

console.log("The server has started.");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("🌟🌟🌟---MongoDB connection succeed---🌟🌟🌟");
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT, function () {
      console.info(
        `The server is running successfully on port: http://localhost:${PORT} \n`
      );
      console.info(`Admin project on port: http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => console.log("Error on connection MongoDB", err));
