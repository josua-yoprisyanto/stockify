import { getCapitalize } from "../../utils/getCapitilize";
describe("getCapitalize", () => {
  it("capitalizes each word separated by underscores", () => {
    const input = "hello_world";
    const result = getCapitalize(input);
    expect(result).toBe("Hello World");
  });

  it("capitalizes each word separated by spaces", () => {
    const input = "hello world";
    const result = getCapitalize(input);
    expect(result).toBe("Hello World");
  });
});
