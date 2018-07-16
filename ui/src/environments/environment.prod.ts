// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const SERVER_PATH: string = '';

export const environment: { [key: string]: string | boolean } = {
  serverPath: `${SERVER_PATH}`,
  apiPath: `${SERVER_PATH}/api`,
  production: true
};
