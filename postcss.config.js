module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/tabbar/],
    }
  }
} 