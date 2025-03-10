import morgan from "morgan";
import moment from "moment-timezone";

const koreaTime = morgan.token("date", () => {
  return moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"); // Korea vaqti
});

export const MORGAN_FORMAT = `[:date] koreaTime \n :method :url :response-time [:status]  \n`;
