const fs = require('fs');
const path = require('path');

const libsComponents = fs.readdirSync(path.join(__dirname, '../../../libs'));

const libsPages = fs.readdirSync(path.join(__dirname, '../../../libs'));

const components = libsComponents.concat(libsPages);

function libsComponentExists(component) {
  return components.indexOf(component) !== -1;
}

module.exports = libsComponentExists;
