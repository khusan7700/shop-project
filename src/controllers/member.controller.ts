import MemberService from "../models/Member.service";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { Member, MemberInput } from "../libs/types/member";
import { LoginInput } from "../libs/types/member";
import Errors from "../libs/Errors";

const memberService = new MemberService();
const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  try {
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input);

    res.json({ member: result });
  } catch (err) {
    console.log("Error, proessSignup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body,
      result = await memberService.login(input);

    res.json({ member: result });
  } catch (err) {
    console.log("Error, getLogin", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default memberController;
