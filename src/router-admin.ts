import express, { Request, Response } from "express";
import restaurantController from "./controllers/restaurantController";

const routerAdmin = express.Router();

routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);

export default routerAdmin;
