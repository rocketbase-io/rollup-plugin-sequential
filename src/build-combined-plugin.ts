import { combinedHooks } from "src/combined-hooks";
import { keys } from "lodash";
import { relevantPlugins } from "src/relevant-plugins";
import { combineFunctions } from "src/combine-functions";

export function buildCombinedPlugin(plugins: any[], once: boolean) {
  const hooks = combinedHooks(plugins);
  const merged: Record<string, any> = {};
  for (const hook of keys(hooks)) {
    const relevant = relevantPlugins(hook, plugins);
    merged[hook] = combineFunctions(hooks[hook], relevant, once);
  }
  return merged;
}
