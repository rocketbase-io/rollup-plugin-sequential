export function relevantPlugins(hook: string, plugins: any[]): any[] {
  return plugins.filter(plugin => hook in plugin && plugin[hook]);
}
