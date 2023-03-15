import originalAngularPlugins, { type PluginOptions } from "@analogjs/vite-plugin-angular";

export function angular(options: PluginOptions) {
    const plugins = originalAngularPlugins(options); // returns an array of 2 plugins

    for (const p of plugins) {
        if (p.name === "@analogjs/vite-plugin-angular") {
            // @ts-ignore
            p["qwikAngularTransform"] = p.transform;
            delete p.transform;
        }
        p.enforce = 'pre'; // so that angular plugins are executed at the same time as qwik ones
    }
    return plugins;
}
