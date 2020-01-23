import { combineAsyncFunctions } from "src/combine-async-functions";

describe("combine-async-functions.ts", () => {
  describe("combineAsyncFunctions()", () => {
    it("should combine relevant methods into one, delegating in the right order", async () => {
      const [fn1, fn2, fn3] = [jest.fn(), jest.fn(), jest.fn()];
      const order: any[] = [];
      const wrap = (fn: any) =>
        function(this: any, ...params: any) {
          order.push(fn);
          return fn.apply(this, params);
        };
      const plugins = [
        { buildEnd: wrap(fn1), load: wrap(fn3) },
        { buildEnd: wrap(fn2), writeBundle: wrap(fn3) }
      ];
      const combined = combineAsyncFunctions("buildEnd", plugins, false);
      expect(typeof combined).toBe("function");
      await combined("TEST");
      expect(fn1).toHaveBeenCalledWith("TEST");
      expect(fn2).toHaveBeenCalledWith("TEST");
      expect(fn3).not.toHaveBeenCalled();
      expect(order).toEqual([fn1, fn2]);
    });
    it("should call functions multiple times if once is false", async () => {
      const [fn1, fn2] = [jest.fn(), jest.fn()];
      const plugins = [{ buildEnd: fn1 }, { buildEnd: fn2 }];
      const combined = combineAsyncFunctions("buildEnd", plugins, false);
      await combined();
      await combined();
      expect(fn1).toHaveBeenCalledTimes(2);
      expect(fn2).toHaveBeenCalledTimes(2);
    });
    it("should call functions once if once is true", async () => {
      const [fn1, fn2] = [jest.fn(), jest.fn()];
      const plugins = [{ buildEnd: fn1 }, { buildEnd: fn2 }];
      const combined = combineAsyncFunctions("buildEnd", plugins, true);
      await combined();
      await combined();
      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
    });
  });
});
