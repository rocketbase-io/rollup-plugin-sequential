import { uniq, fromPairs, keys } from "lodash";
import { Hook, hooks } from "src/hooks";

export function combinedHooks(plugins: any[]): Record<string, Hook> {
  const allKeys: string[] = uniq(plugins.reduce((all, one) => all.concat(keys(one)), []));
  return fromPairs(allKeys.map(key => [key, hooks.find(hook => hook.name === key)]).filter(([, hook]) => !!hook));
}
