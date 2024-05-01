import axios from "axios";
import moment from "moment";
import { handleAddLog } from "../../utils/addLog";

jest.mock("axios");

describe("handleAddLog", () => {
  it("calls axios.post with the correct URL and log data", async () => {
    const mockMessage = "Test message";
    const mockTimestamp = "2024-05-01T12:00:00"; // Mock timestamp
    jest.spyOn(moment.prototype, "format").mockReturnValue(mockTimestamp);
    await handleAddLog(mockMessage);
    expect(axios.post).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/log/`, {
      message: mockMessage,
      timestamp: mockTimestamp,
    });
  });
});
