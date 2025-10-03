import { loadEnv, type ResolvedConfig } from "vite";

export default function virtualModules(mode?: string) {
	const modules: string[] = [];

	return {
		name: "virtual-modules",

		configResolved(config: ResolvedConfig) {
			const env = loadEnv(mode || config.mode, process.cwd(), "");

			if (env.VITE_ENABLE_ADS === "true") {
				modules.push("./src/modules/prebit/index.js");
			}

			if (env.VITE_ENABLE_EVENT_TRACKER === "true") {
				modules.push("./src/modules/eventTracker/StartTracker.ts");
			}
		},

		resolveId(id: string) {
			if (id === "virtual:plugins") return id;
			return null;
		},

		load(id: string) {
			if (id === "virtual:plugins") {
				return modules.map((m) => `import '${m}';`).join("\n");
			}
			return null;
		},
	};
}
