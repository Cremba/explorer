import React from 'react';
import ReactDOMServer from 'react-dom/server';
const path = require('path');
const fs = require('fs');

// import our main App component
import App from '../../../client/src/App';
module.exports = (req, res, next) => {
  const filePath = path.resolve(__dirname, '..', '..', '..', 'client', 'build', 'index.html');

  try {
    const htmlData = fs.readFileSync(filePath, { encoding: 'utf8' });
    // render the app as a string
    const html = ReactDOMServer.renderToString(<App />);

    // inject the rendered app into our html and send it
    res.send(htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  } catch (err) {
    next(err);
  }
};