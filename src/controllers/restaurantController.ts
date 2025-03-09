import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import MemberService from "../models/Member.service";

const memberService = new MemberService();
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    res.send(result);
  } catch (err) {
    console.log("Error, getLogin", err);
    res.send(err);
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("Error, proessSignup", err);
    res.send(err);
  }
};

export default restaurantController;
