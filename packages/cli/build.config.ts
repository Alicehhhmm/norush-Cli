import path from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default {
  input: "./bin/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [],
};
