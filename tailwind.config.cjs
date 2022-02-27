module.exports = {
  // mode: 'jit',
  // purge: ['./src/**/*.svelte'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // theme: {
  //   extend: {},
  // },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["garden", "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade"],
    darkTheme: "dark",
  },
}
