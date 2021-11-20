const proxy = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
  app.use(proxy(`/user/**`, { target: "http://localhost:3001" }));
  app.use(proxy(`/users/**`, { target: "http://localhost:3001" }));
  app.use(proxy(`/user/**`, { target: "https://moonmeds.herokuapp.com/" }));
  console.log("proxy used");
};
