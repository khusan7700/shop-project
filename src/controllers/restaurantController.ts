import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("process>ogin");
    res.send("DONE");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

restaurantController.processSignup = (req: Request, res: Response) => {
  try {
    res.send("processSignup");
  } catch (err) {
    console.log("Error, proessSignup", err);
  }
};

export default restaurantController;
