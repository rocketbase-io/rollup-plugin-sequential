import { default as main } from "src/main";

describe("main.ts", () => {
  describe("default()", () => {
    it("should combine given plugins", () => {
      expect(main([])).toBeDefined();
    });
  });
});
