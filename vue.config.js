process.env.VUE_APP_VERSION = require('./package.json').version

const autoLoadedScssImports = `
  @import '@/assets/styles/variables.scss';
  @import '@/assets/styles/common.scss';
  @import '@/assets/styles/mixins/breakpoints.scss';
`

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // Auto load common scss, and variables
        additionalData: autoLoadedScssImports,
      },
    },
  },
}
