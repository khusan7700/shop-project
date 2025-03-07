import express, { Request, Response } from "express";
import memberController from "./controllers/memberController";
const router = express.Router();

router.get("/", memberController.goHome);

router.get("/login", memberController.getLogin);

router.get("/signup", memberController.getSignup);

export default router;
