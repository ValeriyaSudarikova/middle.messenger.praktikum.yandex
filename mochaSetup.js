const { JSDOM } = require('jsdom');
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<!DOCTYPE html><html lang="ru"><body></body></html>', {
  url: 'http://localhost:3000'
});


global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
}

require.extensions['.scss'] = function () {
  module.exports = () => ({});
}
