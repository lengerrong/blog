/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui", "oracledb", "apollo-graphql-server"]);

module.exports = withTM({
  reactStrictMode: true,
})
