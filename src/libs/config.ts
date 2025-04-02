import morgan from "morgan";
import moment from "moment-timezone";
import mongoose from "mongoose";
const koreaTime = morgan.token("date", () => {
  return moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"); // Korea vaqti
});

export const MORGAN_FORMAT = `[:date] korea Time \n :method :url :response-time [:status]  \n`;

export const shapeIntoMongooseObjectId = (target: any) => {
  return typeof target === "string"
    ? new mongoose.Types.ObjectId(target)
    : target;
};

export const AUTH_TIMER = 24;
