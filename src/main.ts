import { Config } from "src/config";
import { buildCombinedPlugin } from "src/build-combined-plugin";

export default function(plugins: any[], { once = false }: Partial<Config> = {}) {
  return buildCombinedPlugin(plugins, once);
}
