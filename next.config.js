/* global require, module */
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
});
