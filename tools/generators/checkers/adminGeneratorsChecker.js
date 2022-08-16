const fs = require('fs');
const path = require('path');

const adminComponents = fs.readdirSync(
  path.join(__dirname, '../../../apps/admin/src/app/components')
);

const adminPages = fs.readdirSync(
  path.join(__dirname, '../../../apps/admin/src/app/pages')
);

const components = adminComponents.concat(adminPages);

function adminSideComponentExists(component) {
  return components.indexOf(component) !== -1;
}

module.exports = adminSideComponentExists;
