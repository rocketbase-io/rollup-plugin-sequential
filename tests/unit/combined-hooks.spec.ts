import { combinedHooks } from "src/combined-hooks";
import { keys } from "lodash";

describe("combined-hooks.ts", () => {
  describe("combinedHooks()", () => {
    it("should return a map of hooks for given plugins", () => {
      const nop = () => undefined;
      const plugins = [
        { buildEnd: nop, load: nop },
        { buildEnd: nop, writeBundle: nop }
      ];
      const result = combinedHooks(plugins);
      expect(keys(result)).toContain("buildEnd");
      expect(keys(result)).toContain("load");
      expect(keys(result)).toContain("writeBundle");
    });
    it("should not map nonexistent hooks", () => {
      const nop = () => undefined;
      const plugins = [
        { buildEnd: nop, load: nop },
        { buildEnd: nop, foobar: nop }
      ];
      const result = combinedHooks(plugins);
      expect(keys(result)).toContain("buildEnd");
      expect(keys(result)).toContain("load");
      expect(keys(result)).not.toContain("foobar");
    });
  });
});
