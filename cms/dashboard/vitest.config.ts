import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    test: {
        globals: true,
        exclude: [...configDefaults.exclude, "**/*e2e.spec.ts"],
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts"
    },
    plugins: [react()],
    resolve: {}
});
