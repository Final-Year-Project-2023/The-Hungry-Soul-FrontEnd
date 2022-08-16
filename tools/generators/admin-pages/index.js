const { adminSideComponentExists } = require('../checkers');

module.exports = {
  description: 'Adds a Page for the admin project',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the page?',
      validate: (name) => {
        if (/.+/.test(name)) {
          return adminSideComponentExists(name)
            ? 'A page with this name already exists'
            : true;
        }
        return 'A name is required';
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of component is this?',
      choices: ['Class Component', 'Function Component'],
      default: 'Function Component',
    },
    {
      type: 'confirm',
      name: 'wantRedux',
      message: 'Do you want to wrap this component with Redux Connect?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      message: 'Do you want to enable SEO configs?',
      default: true,
    },
  ],
  actions: (response) => {
    const actions = [
      {
        type: 'add',
        path: '../../apps/admin/src/app/pages/{{properCase name}}/styles.scss',
        templateFile: './admin-pages/styles.scss.hbs',
        abortOnFail: true,
      },
    ];
    if (response.type === 'Class Component') {
      actions.push({
        type: 'add',
        path: '../../apps/admin/src/app/pages/{{properCase name}}/index.tsx',
        templateFile: './admin-pages/classComponent.tsx.hbs',
        abortOnFail: true,
      });
    }
    if (response.type === 'Function Component') {
      actions.push({
        type: 'add',
        path: '../../apps/admin/src/app/pages/{{properCase name}}/index.tsx',
        templateFile: './admin-pages/functionComponent.tsx.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
