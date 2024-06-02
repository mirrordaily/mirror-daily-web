module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}
