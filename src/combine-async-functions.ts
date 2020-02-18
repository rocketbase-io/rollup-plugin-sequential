export function combineAsyncFunctions(name: string, plugins: any[], once: boolean) {
  let ranBefore = false;
  return function(this: any, ...params: any[]) {
    if (once && ranBefore) return;
    ranBefore = true;
    return plugins.reduce((before, plugin) => {
      return before.then(() => plugin[name].call(this, ...params));
    }, Promise.resolve());
  };
}
