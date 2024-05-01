import axios from "axios";
import moment from "moment";

export const handleAddLog = async (message: string) => {
  const log = {
    message: message,
    timestamp: moment().format(),
  };
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/log/`, log);
};
