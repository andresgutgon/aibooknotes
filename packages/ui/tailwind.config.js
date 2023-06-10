const preset = require('tailwind-config/tailwind.config.js')
const animatePlugin = require('tailwindcss-animate')

module.exports = {
  presets: [preset],
  plugins: [animatePlugin()],
}
