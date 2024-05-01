import { getPrice } from "../../utils/getPrice";

describe("getPrice", () => {
  it("formats numbers into Indonesian Rupiah format", () => {
    expect(getPrice(1000)).toBe("Rp. 1.000");
    expect(getPrice(10000)).toBe("Rp. 10.000");
    expect(getPrice(100000)).toBe("Rp. 100.000");
    expect(getPrice(1000000)).toBe("Rp. 1.000.000");
  });

  it("handles negative numbers", () => {
    expect(getPrice(-1000)).toBe("Rp. -1.000");
    expect(getPrice(-10000)).toBe("Rp. -10.000");
  });
});
