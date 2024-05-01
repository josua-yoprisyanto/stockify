import { createResourceId } from "../../utils/create-resource-id";

beforeEach(() => {
  Object.defineProperty(window, "crypto", {
    value: {
      getRandomValues: jest.fn().mockReturnValueOnce(new Uint8Array(12)),
    },
  });
});

describe("createResourceId", () => {
  it("returns a string of length 24 with only hexadecimal characters", () => {
    const result = createResourceId();
    expect(result).toHaveLength(24);
    expect(/^[0-9a-f]+$/.test(result)).toBe(true);
  });
});
