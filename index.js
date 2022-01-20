const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const fs = require("fs");
const https = require("https");
const cors = require("cors");

function runProxy(targetUrl, serverPort = 3008, serverHttps = true) {
  const app = express();

  const options = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    ssl: {
      key: fs.readFileSync("key.key", "utf8"),
      cert: fs.readFileSync("certificate.crt", "utf8"),
    },
  });
  
  //app.cors = cors();

  app.use("/", options);
  
  var credentials = {
    key: fs.readFileSync("key.key").toString(),
    cert: fs.readFileSync("certificate.crt").toString(),
  };
  
  var appHttps = https.createServer(credentials, app);
  
  if (!serverHttps) {
    app.listen(serverPort);
  } else {
    appHttps.listen(serverPort);
  }
}

let USE_HTTPS = true;

//runProxy("http://admin-authorization-service-release-market-29318.sc.stg.s.o3.ru", 3008, USE_HTTPS);
//runProxy("http://ozonid-gateway.bx.stg.s.o3.ru:80", 3009, USE_HTTPS);
//runProxy("http://moderation.ps.stg.s.o3.ru", 3007, USE_HTTPS);
runProxy("http://moderation-psmod-1851.dev.a.o3.ru:80", 3009, USE_HTTPS);
