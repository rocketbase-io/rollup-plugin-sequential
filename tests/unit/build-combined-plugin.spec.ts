import { buildCombinedPlugin } from "src/build-combined-plugin";

describe("build-combined-plugin.ts", () => {
  describe("buildCombinedPlugin()", () => {
    it("should combine plugins with different hooks into one", () => {
      const nop = () => undefined;
      const plugins = [
        { buildEnd: nop, load: nop },
        { buildEnd: nop, writeBundle: nop },
        { buildEnd: nop, foobar: nop }
      ];
      const combined = buildCombinedPlugin(plugins, false);
      expect(combined.buildEnd).toBeDefined();
      expect(combined.load).toBeDefined();
      expect(combined.writeBundle).toBeDefined();
      expect(combined.foobar).not.toBeDefined();
    });
  });
});
