import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { LoginInput, MemberInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import MemberService from "../models/Member.service";
import Errors, { Message } from "../libs/Errors";

const memberService = new MemberService();
const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log("Error, goHome", err);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
    res.redirect("/admin");
  }
};

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

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    req.session.save(function () {
      res.send(result);
      console.log("👤--memberNick--👤", req.session.member.memberNick);
    });
  } catch (err) {
    console.log("Error, proessSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}; window.location.replace('admin/signup')</script>`
    );
  }
};

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

export default restaurantController;
