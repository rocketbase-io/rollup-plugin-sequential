/* eslint-disable */
/**
 * RollupPluginSequential (@rocketbase/rollup-plugin-sequential v0.0.0)
 * Run commands after building
 * https://github.com/rocketbase-io/rollup-plugin-sequential#readme
 * (c) 2020 Rocketbase Team <team@rocketbase.io>
 * @license MIT
 */
import { fromPairs, uniq, keys } from 'lodash';

const hooks = [
  { name: "augmentChunkHash", kind: ["sync", "sequential"], phase: "generate" },
  { name: "banner", kind: ["async", "parallel"], phase: "generate" },
  { name: "buildEnd", kind: ["async", "parallel"], phase: "build" },
  { name: "buildStart", kind: ["async", "parallel"], phase: "build" },
  { name: "footer", kind: ["async", "parallel"], phase: "generate" },
  { name: "generateBundle", kind: ["async", "sequential"], phase: "generate" },
  { name: "intro", kind: ["async", "parallel"], phase: "generate" },
  { name: "load", kind: ["async", "first"], phase: "build" },
  { name: "options", kind: ["sync", "sequential"], phase: "build" },
  { name: "outputOptions", kind: ["sync", "sequential"], phase: "generate" },
  { name: "outro", kind: ["async", "parallel"], phase: "generate" },
  { name: "renderChunk", kind: ["async", "sequential"], phase: "generate" },
  { name: "renderError", kind: ["async", "parallel"], phase: "generate" },
  { name: "renderStart", kind: ["async", "parallel"], phase: "generate" },
  { name: "resolveDynamicImport", kind: ["async", "first"], phase: "build" },
  { name: "resolveFileUrl", kind: ["sync", "first"], phase: "generate" },
  { name: "resolveId", kind: ["async", "first"], phase: "build" },
  { name: "resolveImportMeta", kind: ["sync", "first"], phase: "generate" },
  { name: "transform", kind: ["async", "sequential"], phase: "build" },
  { name: "watchChange", kind: ["sync", "sequential"], phase: "build" },
  { name: "writeBundle", kind: ["async", "parallel"], phase: "generate" }
];

function combinedHooks(plugins) {
  const allKeys = uniq(plugins.reduce((all, one) => all.concat(keys(one)), []));
  return fromPairs(allKeys.map(key => [key, hooks.find(hook => hook.name === key)]).filter(([, hook]) => !!hook));
}

function relevantPlugins(hook, plugins) {
  return plugins.filter(plugin => hook in plugin && plugin[hook]);
}

function combineAsyncFunctions(name, plugins, once) {
  let ranBefore = false;
  return (...params) => {
    if (once && ranBefore)
      return;
    ranBefore = true;
    return plugins.reduce((before, plugin) => {
      return before.then(() => plugin[name].call(plugin, ...params));
    }, Promise.resolve());
  };
}

function combineSyncFunctions(name, plugins, once) {
  let ranBefore = false;
  let lastResult = undefined;
  return (...params) => {
    if (once && ranBefore)
      return lastResult;
    ranBefore = true;
    plugins.forEach(plugin => (lastResult = plugin[name].call(plugin, ...params)));
    return lastResult;
  };
}

function combineFunctions(hook, plugins, once) {
  if (hook.kind.indexOf("async") !== -1)
    return combineAsyncFunctions(hook.name, plugins, once);
  else
    return combineSyncFunctions(hook.name, plugins, once);
}

function buildCombinedPlugin(plugins, once) {
  const hooks = combinedHooks(plugins);
  const merged = {};
  for (const hook of keys(hooks)) {
    const relevant = relevantPlugins(hook, plugins);
    merged[hook] = combineFunctions(hooks[hook], relevant, once);
  }
  return merged;
}

function main (plugins, { once = false } = {}) {
  return buildCombinedPlugin(plugins, once);
}

export default main;
