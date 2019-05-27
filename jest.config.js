module.exports = {
  testEnvironment : 'jest-environment-jsdom',
  moduleNameMapper : {
    '\\.module\\.css$' : 'identity-obj-proxy',
    '\\.css$' : require.resolve('./test/style-mock.js')
  },

  // setupTestFrameworkScriptFile : require.resolve('./test/setup-tests.js')
  setupFilesAfterEnv : [require.resolve('./test/setup-tests.js')],
  collectCoverageFrom : ['**/src/js/components/**/*.js'],
  coverageThreshold : {
    global : {
      statements : 2,
      branches : 30,
      lines : 40,
      functions : 50
    },
    './src/js/components/Child.js' : {
      statements : 100,
      branches : 100,
      lines : 100,
      functions : 100
    }
  },

  watchPlugins : [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
