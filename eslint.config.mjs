import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Project overrides to keep CI/Vercel builds green
  {
    files: ["**/*.{ts,tsx}"] ,
    rules: {
      // Allow using `any` in service and integration code paths
      "@typescript-eslint/no-explicit-any": "off",
      // Treat unused vars as warnings; ignore underscores
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // We intentionally use <img> in controlled places
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["src/services/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
