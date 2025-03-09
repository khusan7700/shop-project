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
      res.send(result);
      // res.redirect("/admin/product/all");
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
    console.log("processSignup");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "");
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    console.log("👤--memberNick--👤", req.session.member.memberNick);
    req.session.save(function () {
      res.send(result);
      // res.redirect("/admin/product/all");
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
    console.log("checkAuthSession");
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

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("verifyRestaurant");
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

export default restaurantController;
