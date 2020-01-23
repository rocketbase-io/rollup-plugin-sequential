import { Hook } from "src/hooks";
import { combineAsyncFunctions } from "src/combine-async-functions";
import { combineSyncFunctions } from "src/combine-sync-functions";

export function combineFunctions(hook: Hook, plugins: any[], once: boolean) {
  if (hook.kind.indexOf("async") !== -1) return combineAsyncFunctions(hook.name, plugins, once);
  else return combineSyncFunctions(hook.name, plugins, once);
}
