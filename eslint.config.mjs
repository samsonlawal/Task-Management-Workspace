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

  {
    // Custom rule overrides
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // Disable unused vars rule
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade 'any' to warning
      "prefer-const": "warn", // Shows as a warning (yellow underline) but won't fail builds
    },
  },
];

export default eslintConfig;
