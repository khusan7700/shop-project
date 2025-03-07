import express, { Request, Response } from "express";
import restaurantController from "./controllers/restaurantController";
const router = express.Router();

router.get("/", restaurantController.goHome);

router.get("/login", restaurantController.getLogin);

router.get("/signup", restaurantController.getSignup);

export default router;
