import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  input: "dist/esm/scrollspy.js",
  output: {
    file: "dist/scrollspy.js",
    format: "umd",
    name: "ScrollSpy",
    sourcemap: true
  },
  plugins: [sourcemaps()] // load existing sourcemaps so maps reflect raw source
};
