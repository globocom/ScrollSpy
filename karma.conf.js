// Karma configuration

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["dist/umd/scrollspy.js", "test/util/*.js", "test/**/*Spec.js"],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: ["Chrome"]
  });
};
