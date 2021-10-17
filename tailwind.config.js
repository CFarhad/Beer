module.exports = {
  purge: ['./src/**/*.{svelte,js,html}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      persian: ['iransans']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
