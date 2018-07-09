const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();
app.use(history());
app.use(serveStatic(`${__dirname}/dist`));
console.log(__dirname);
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server started at port:${port}`);
