import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  Member,
  MemberInput,
  LoginInput,
  AdminRequest,
} from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();
const restaurantController: T = {};

//---------------------------------------------------------------------------------

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log("Error, goHome", err);
    res.redirect("/admin");
  }
};

//---------------------------------------------------------------------------------

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
    res.redirect("/admin");
  }
};

//---------------------------------------------------------------------------------

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
    res.redirect("/admin");
  }
};

//---------------------------------------------------------------------------------

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    req.session.member = result;
    console.log("👤--memberNick--👤", req.session.member.memberNick);
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, getLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}; window.location.replace('admin/login')</script>`
    );
  }
};

//---------------------------------------------------------------------------------

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const file = req.file;
    if (!file)
      throw new Errors(
        HttpCode.BAD_REQUEST,
        Message.PROBLEM_ON_PROCESS_SIGNUP_FILE
      );

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    console.log("👤--memberNick--👤", req.session.member.memberNick);
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processSignup:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace("/admin/signup")</script>`
    );
  }
};

//---------------------------------------------------------------------------------

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    if (req.session?.member)
      res.send(
        `<script> alert("Hi ${req.session.member.memberNick}")</script>`
      );
    else res.send(`<script> alert("${Message.NOT_AITHENTICAATED}")</script>`);
    console.log("👤--memberNick--👤", req.session.member.memberNick);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

//---------------------------------------------------------------------------------

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    console.log("🚪--memberNick--🚪", req.session.member.memberNick);
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

//---------------------------------------------------------------------------------

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
  }
};

//---------------------------------------------------------------------------------

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("UpdateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ users: result });
  } catch (err) {
    console.log("Error, UpdateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

//---------------------------------------------------------------------------------

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AITHENTICAATED;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};
//---------------------------------------------------------------------------------
export default restaurantController;
