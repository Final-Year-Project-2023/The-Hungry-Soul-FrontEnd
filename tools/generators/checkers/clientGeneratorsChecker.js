const fs = require('fs');
const path = require('path');

const clientComponents = fs.readdirSync(
  path.join(__dirname, '../../../apps/client/src/app/components')
);

const clientPages = fs.readdirSync(
  path.join(__dirname, '../../../apps/client/src/app/pages')
);

const components = clientComponents.concat(clientPages);

function clientSideComponentExists(component) {
  return components.indexOf(component) !== -1;
}

module.exports = clientSideComponentExists;
