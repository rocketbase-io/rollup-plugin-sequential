import { relevantPlugins } from "src/relevant-plugins";

describe("relevant-plugins.ts", () => {
  describe("relevantPlugins()", () => {
    it("should return only plugins with a given hook", () => {
      const nop = () => undefined;
      const plugins = [
        { buildEnd: nop, load: nop },
        { buildEnd: nop, writeBundle: nop }
      ];
      expect(relevantPlugins("load", plugins)).toEqual([plugins[0]]);
    });
  });
});
