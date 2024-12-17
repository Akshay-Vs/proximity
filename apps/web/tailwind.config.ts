// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@proximity/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx", "./hooks/**/*.ts",],
  theme: {
    extends: {
      fontFamily: {
        jost: ["var(--font-jost-mono)"],
      },
    }
  },
  presets: [sharedConfig],
};

export default config;