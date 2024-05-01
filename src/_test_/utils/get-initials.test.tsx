import { getInitials } from "../../utils/get-initials";

describe("getInitials", () => {
  it("returns an empty string when input name is empty", () => {
    const result = getInitials("");
    expect(result).toBe("");
  });

  it("returns the first initial when input name contains a single word", () => {
    const input = "John";
    const result = getInitials(input);
    expect(result).toBe("J");
  });

  it("returns the first initials of each word when input name contains multiple words", () => {
    const input = "John Doe";
    const result = getInitials(input);
    expect(result).toBe("JD");
  });
});
