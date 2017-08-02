import lint from 'mocha-eslint';

const paths = [
  "*.js",
  "src/**/*.js",
  "src/**/*.jsx",
  "test/**/*.js",
  "test/**/*.jsx"
];
lint(paths, {});
