'use strict';

const app = require('./app');
const config = require('./config/Config');

const start = () => {
  const port = config.any(['PORT', 'server:port']);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

module.exports = { app, start };
