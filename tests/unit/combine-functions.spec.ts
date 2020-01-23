import { combineFunctions } from "src/combine-functions";
import { hooks } from "src/hooks";

describe("combine-functions.ts", () => {
  describe("combineFunctions()", () => {
    it("should combine async functions if the hook kind is async", () => {
      const nop = () => undefined;
      const plugins = [
        { buildEnd: nop, load: nop },
        { buildEnd: nop, writeBundle: nop }
      ];
      const combined = combineFunctions(hooks.find(it => it.name === "buildEnd")!, plugins, false);
      expect(typeof combined).toBe("function");
      expect(combined().then).toBeDefined();
    });
    it("should combine sync functions if the hook is sync", () => {
      const nop = () => undefined;
      const plugins = [
        { resolveFileUrl: nop, load: nop },
        { resolveFileUrl: nop, writeBundle: nop }
      ];
      const combined = combineFunctions(hooks.find(it => it.name === "resolveFileUrl")!, plugins, false);
      expect(typeof combined).toBe("function");
      expect(combined()).toBeUndefined();
    });
  });
});
