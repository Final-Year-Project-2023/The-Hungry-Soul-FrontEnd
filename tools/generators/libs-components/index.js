const { libsComponentExists } = require('../checkers');

module.exports = {
  description: 'Adds a global reusable component for the project',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?',
      validate: (name) => {
        if (/.+/.test(name)) {
          return libsComponentExists(name)
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
        path: '../../libs/{{properCase name}}/styles.scss',
        templateFile: './libs-components/styles.scss.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../..libs/index.tsx',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '../..libs/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: ` {{pascalCase name}},`,
        abortOnFail: true,
      },
    ];
    if (response.type === 'Class Component') {
      actions.push({
        type: 'add',
        path: '../../libs/{{properCase name}}/index.tsx',
        templateFile: './libs-components/classComponent.tsx.hbs',
        abortOnFail: true,
      });
    }
    if (response.type === 'Function Component') {
      actions.push({
        type: 'add',
        path: '../../libs/{{properCase name}}/index.tsx',
        templateFile: './libs-components/functionComponent.tsx.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
