// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@proximity/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx", "./components/**/*.ts", "./hooks/**/*.ts",],
  presets: [sharedConfig],
};

export default config;