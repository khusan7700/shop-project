import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcryptjs from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = MemberModel;
  }
  // -----------------------------SPA----------------------------------------//
  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcryptjs.genSalt();
    input.memberPassword = await bcryptjs.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      console.log("Signup process created successfully.");

      return result.toJSON as unknown as Member;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  //---------------------------------------------------------------------------------

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    const isMatch = await bcryptjs.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).lean().exec();
    console.log("Login process entered successfully.");
    return result as unknown as Member;
  }
  //------------------------------SSR---------------------------------------//

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec();

    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcryptjs.genSalt();
    input.memberPassword = await bcryptjs.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      console.log("Signup process completed successfully.");
      return result as unknown as Member;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  //---------------------------------------------------------------------------------

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcryptjs.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).exec();
    console.log("Login process completed successfully.");
    return result as unknown as Member;
  }

  //---------------------------------------------------------------------------------

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({
        memberType: MemberType.USER,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result as unknown as Member[];
  }

  //---------------------------------------------------------------------------------

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result as unknown as Member;
  }
}

export default MemberService;
