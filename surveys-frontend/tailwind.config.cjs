/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/App.vue',
    './src/**/**/*.vue',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'cf-1': '#162447',
        'cf-2': '#1F4068',
        'cf-3': '#1B1B2F',
        'cf-4': '#E43F5A'
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
