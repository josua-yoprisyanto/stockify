import { getToken } from "../../utils/getToken"; // Replace "yourFile" with the path to your file

describe("getToken", () => {
  it("returns the token stored in localStorage", () => {
    const localStorageMock = {
      getItem: jest.fn(),
    };
    const mockToken = "mock-token";
    localStorageMock.getItem.mockReturnValue(mockToken);
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    const result = getToken();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    expect(result).toBe(mockToken);
  });

  it("returns an empty string if token is not stored in localStorage", () => {
    const localStorageMock = {
      getItem: jest.fn(),
    };
    localStorageMock.getItem.mockReturnValue(null);
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    const result = getToken();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    expect(result).toBe("");
  });
});
