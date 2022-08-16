const libComponentGenerator = require('./libs-components');
const adminComponentGenerator = require('./admin-components');
const clientComponentGenerator = require('./client-components');
const clientPageGenerator = require('./client-pages');
const adminPageGenerator = require('./admin-pages');

module.exports = (plop) => {
  plop.setGenerator('libs component', libComponentGenerator);
  plop.setGenerator('admin component', adminComponentGenerator);
  plop.setGenerator('client component', clientComponentGenerator);
  plop.setGenerator('client page', clientPageGenerator);
  plop.setGenerator('admin page', adminPageGenerator);
};
