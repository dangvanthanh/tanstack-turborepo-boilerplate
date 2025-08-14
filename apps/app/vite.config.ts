import contentCollections from "@content-collections/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		contentCollections(),
		tsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart({ customViteReactPlugin: true }),
		viteReact(),
	],
});
