module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'], // Files to scan for used CSS classes
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      'blue-500': '#2AA7FF',
      },
    },
  },
  variants: {},
  plugins: [],
}
