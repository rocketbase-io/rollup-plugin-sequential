export interface Hook {
  name: string;
  kind: string[];
  phase: string;
}

export const hooks: Hook[] = [
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
