const preset = require('tailwind-config/tailwind.config.js')

module.exports = {
  presets: [preset],
  content: [
    '../../packages/ui/src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
