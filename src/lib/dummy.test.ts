import { sum } from "./dummy-helper";

describe("dummy test", () => {
  describe("sum", () => {
    describe("given two numbers", () => {
      it("should return sum", () => {
        const a = 80;
        const b = 5;

        expect(sum(a, b)).toBe(a + b);
      });
    });
  });
});
