const { getHighlighter, BUNDLED_LANGUAGES } = require('shiki')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    rehypePrettyCodeOptions: {
      getHighlighter: options =>
        getHighlighter({
          ...options,
          langs: [
            ...BUNDLED_LANGUAGES,
            // custom grammar options, see the Shiki documentation for how to provide these options
            {
              id: 'pax',
              scopeName: 'source.pax',
              aliases: ['paxel'], // Along with id, aliases will be included in the allowed names you can use when writing markdown.
              path: '../../public/grammar/pax.tmLanguage.json'
            }
          ]
        })
    }
  }
})

module.exports = withNextra()
