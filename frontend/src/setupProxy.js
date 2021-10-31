const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(proxy(`/user/**`, { target: "http://localhost:3001" }));
  console.log("proxy used");
};
