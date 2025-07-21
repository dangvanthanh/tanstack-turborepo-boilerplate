import contentCollections from "@content-collections/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		contentCollections(),
		tsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart(),
	],
});
