export function combineSyncFunctions(name: string, plugins: any[], once: boolean) {
  let ranBefore = false;
  let lastResult: any = undefined;
  return (...params: any) => {
    if (once && ranBefore) return lastResult;
    ranBefore = true;
    plugins.forEach(plugin => (lastResult = plugin[name].call(plugin, ...params)));
    return lastResult;
  };
}
