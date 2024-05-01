import { applyPagination } from "../../utils/apply-pagination";

describe("applyPagination", () => {
  it("returns the correct subset of documents for the given page and rowsPerPage", () => {
    const documents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const page = 1;
    const rowsPerPage = 3;
    const result = applyPagination(documents, page, rowsPerPage);
    expect(result).toEqual([4, 5, 6]);
  });

  it("returns an empty array if documents is empty", () => {
    const documents: any[] = [];
    const page = 0;
    const rowsPerPage = 10;
    const result = applyPagination(documents, page, rowsPerPage);
    expect(result).toEqual([]);
  });

  it("returns an empty array if page is out of range", () => {
    const documents = [1, 2, 3];
    const page = 2;
    const rowsPerPage = 3;
    const result = applyPagination(documents, page, rowsPerPage);
    expect(result).toEqual([]);
  });

  it("returns the remaining documents if the last page has fewer rows", () => {
    const documents = [1, 2, 3, 4, 5, 6, 7];
    const page = 1;
    const rowsPerPage = 4;
    const result = applyPagination(documents, page, rowsPerPage);
    expect(result).toEqual([5, 6, 7]);
  });
});
