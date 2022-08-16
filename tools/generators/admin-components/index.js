const { adminSideComponentExists } = require('../checkers');

module.exports = {
  description: 'Adds a reusable component for the admin project only',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?',
      validate: (name) => {
        if (/.+/.test(name)) {
          return adminSideComponentExists(name)
            ? 'A component with this name already exists'
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
  ],
  actions: (response) => {
    const actions = [
      {
        type: 'add',
        path: '../../apps/admin/src/app/components/{{properCase name}}/styles.scss',
        templateFile: './admin-components/styles.scss.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../../apps/admin/src/app/components/index.tsx',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../../apps/admin/src/app/components/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: ` {{pascalCase name}},`,
        abortOnFail: true,
      },
    ];
    if (response.type === 'Class Component') {
      actions.push({
        type: 'add',
        path: '../../apps/admin/src/app/components/{{properCase name}}/index.tsx',
        templateFile: './admin-components/classComponent.tsx.hbs',
        abortOnFail: true,
      });
    }
    if (response.type === 'Function Component') {
      actions.push({
        type: 'add',
        path: '../../apps/admin/src/app/components/{{properCase name}}/index.tsx',
        templateFile: './admin-components/functionComponent.tsx.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
