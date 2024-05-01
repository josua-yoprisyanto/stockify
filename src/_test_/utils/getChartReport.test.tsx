import { getChartReport } from "../../utils/getChartReport";
describe("getChartReport", () => {
  it("returns an array with total 0 for the last 7 days when reportData is empty", () => {
    const reportData: any[] = [];
    const result = getChartReport(reportData);
    expect(result).toHaveLength(7);
    result.forEach((day) => {
      expect(day.total).toBe(0);
    });
  });
});
