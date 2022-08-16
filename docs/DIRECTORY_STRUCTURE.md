- .circleci: contains the config for the circle ci pipeline.
- .husky: contains the shell scripts for the linting the commits.
- apps: this hold the main client and admin application.
- docs: the documentation for the project.
- libs: UI library of the application. It has all the reusable UI components of the app.
- tools: contains generators to generate the boilerplate for the UI components and pages.

#### Dos and Don'ts:

- Do not create the components/pages directly. Always use a generator for the same to maintain the consistency throughout the application.
- Avoid skipping the commit lint checks.
- Try to write testcases for the components you generate.
- Give a verbose description of your PR to better review it.
