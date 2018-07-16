# ui-auto-tests
-This repository keeps the automation project in the Zero Based Website. The automation project is written with the Protractor framework.

## *Important note*
If you are working on angular app automation then don't forget to remove
browser.waitForAngularEnabled(false); e2e\page-objects\pages\base-page.ts Line-10

## Code organization

For integration tests the folder structure should be similar to this as our spec files are going to utilize multiple page objects for completing a test
```
─e2e
    │   tsconfig.e2e.json
    │
    ├───components
    │   ├───devfactory
    │   │   ├───component-helpers
    │   │   │       component-helpers.ts
    │   │   │
    │   │   └───component-types
    │   │       └───(component-name)-component
    │   │    breadcrumbs-component-selectors.ts
    │   │
    │   ├───html
    │   │       (type)-helper.ts
    │   │
    │   ├───misc-utils
    │   │       common-label.ts
    │   │       constants.ts
    │   │       html-helper.ts
    │   │
    │   └───vendor
    │       └───vendor-name
    │    vendor-name.ts
    │
    ├───page-objects
    │   ├───contracts
    │   │       page.ts
    │   │
    │   └───pages
    │       │   base-page.ts
    │       │
    │       └───(page-name)
    │               (page-name)-page.constants.ts
    │               (page-name)-page.helper.ts
    │               (page-name)-page.validations.ts
    │               (page-name).po.ts
    │
    └───test-suites
        ├───(test-rail-suite-name)-test-suite
        │   └───(testrail-root-after-suite)
        │(testrail-root-after-suite).e2e-spec.ts
        │
        └───helpers
     suite-names.ts
```


### Contracts


e2e\modules\Contracts are basically a kind of interface, like those things which are compulsory to be implemented by every page object file. Right now we have it for Page, so whatever is declared in it is a unified requirement for all the components that should be put in here. So this `Page` contract has to be inherited by all the page objects


### Base Page

e2e\page-objects\base-page it's basically a utility for all the tricky selectors so this page has to be inherited by all the page objects

### Naming convention


We are using default conventions which are suggested by angular team on top of that we are also using some more configuration parameters to produce high quality code.
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines

### Spec files


We must post fix `.e2e-spec.ts` for all the test files


## Reporting component

Allure reporting is integrated. For configuration please visit https://github.com/allure-framework/allure-jasmine

On Team city we have to use TeamCity plugin

https://github.com/allure-framework/allure-teamcity

Or

https://github.com/eroshenkoam/allure-teamcity-plugin

on local machine it can be generated via command line

npm install -g allure-commandline --save-dev

allure serve <path of artifacts>

ex. allure serve allure-results

## Running parallel tests execution

Following keys are defined here - core/config-setup/default-config-setup.js

multiCapabilities.maxInstances: 5  Default max instances for selenium grid

bsMultiCapabilities.maxInstances: 5 Default max instances for browser stack


3 Ways to pass the max instances

1. Using environment variable MAX_INSTANCES

2. Using command line param --params.maxInstances

3. Default is 5



## Running end-to-end tests


Run health suite on Enterprise URL: 

1. Install NodeJS in local (https://nodejs.org/en/download/) e.g. v9.10
2. Install protractor globally. Command: npm install -g protractor
3. Clone the repo in local
4. Open terminal/cmd inside cloned directory (where package.json is present)
5. Install project dependencies. Command: npm install
6. npm run e2e



Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Customization switches

Almost all the switches are configurable using Environment variable, Check the respective section for more details

### Passing parameters to NPM

NPM scripts can have parameters passed by command line.  E.g.:

```
npm run e2e --baseUrl=<URL>
```

Following sections defines which parameters are accepted by Protractor and TestRail.

### Test rail switches


We have following various command line options available which can be specified as follows with `protractor` command
All of them are optional

--params.testrail.projectId = [N] : Testrail project id, it should not be passed via command line and can be specified in params section so all the info is unified


--params.testrail.milestoneName = [Milestone name] : This milestone will be used to create a milestone with a postfix as current week number or it's already created it will not be created


--params.testrail.versionName = [Version name] : This version name is basically a field in test rail test case result field, we might want to specify that which version it should be tagged to then we can specify


--params.testrail.host = [e.g https://testrail.devfactory.com/] This would be common across all the projects but still we have made it configurable


--params.testrail.user = [login id] - It is recommended to always pass it using continuous integration tool so it's secure


--params.testrail.password = [XXXX] - It is recommended to always pass it using continuous integration tool so it's secure it can be either a password or access key


* Test writing instructions - Please make sure that `suite name` in test rail and in *-specs.ts is same and test case has an id append to name with bracket, Here `suite name` is defined in describe and `test id` is defined as [1].
Example

```javascript
describe("This should be the suite name", function() {
  it("Mind the id at the end of this with bracket - [1]", function() {
    expect(true).toBe(true);
  });
});
```

### Defect linking in testrail for the ignored tests

If we want to associate bug id with test case in a run then we must append the bug id in test name like [BUG:XXX-00000],
Please note that it must be ignored then only it will be associated with test case, This test case will be marked as skipped
in test rail

Example

```javascript
describe("This should be the suite name", function() {
  xit("Mind the id at the end of this with bracket - [1] [BUG:SNSGCID-19909]", function() {
    expect(true).toBe(true);
  });
});
```

Environment variables configuration for test rail-

projectId - process.env.TESTRAIL_PROJECT_ID

milestoneName - process.env.TESTRAIL_MILESTONE_NAME

versionName - process.env.VERSION

host - process.env.TESTRAIL_HOST

user - process.env.TESTRAIL_USER

password - process.env.TESTRAIL_PASSWORD

### Misc. Switches

You might want to have some misc info to be passed from command line that can be specified using an object under param section of object in config
For example we have 2 switches right now like
--params.login.user = [XXXX]
--params.login.password = [XXXX]


### Product version switch
--params.testrail.versionName Or process.env.VERSION

Default - as Required

### Selenium hub switch
--params.selenium.hub Or process.env.SELENIUM_URL

Default - as Required


### Protractor switches

Browser stack related configuration can be passed command line and following options are available

--params.browserstack.user='bs-username'

--params.browserstack.key='bs-key'

--params.browserstack.local=[true|false]

Default is true

--params.browserstack.browser=browserName
Default is Chrome

Default browser names are available `Chrome`, `Firefox`, `IE`, `IE10`, `Edge`, `Safari`, `Safari9`

We can also have them using environment variables, Following keys are used for their respective values

'browserstack.user' - process.env.BROWSERSTACK_USERNAME

'browserstack.key' - process.env.BROWSERSTACK_ACCESS_KEY

'browserstack.local' - process.env.BROWSERSTACK_LOCAL

'browserstack.localIdentifier' - process.env.BROWSERSTACK_LOCAL_IDENTIFIER

'build' - process.env.BROWSERSTACK_BUILD

## Video recording of new architecture
https://drive.google.com/drive/folders/1t0JGH7KruGV9s32KmWMmKtrzw0nexTR6

## Automation best practices document
https://docs.google.com/document/d/1e84nd7piGq-w_ZyguvHsKwRkt637-zwlIiO36MKLSB4/edit#heading=h.er9ghkoz1o6v

## Test rail package
https://github.com/trilogy-group/aurea-jasmine-testrail-reporter

## Test rail documentation
https://docs.google.com/document/d/1QAv5gtNbiaAO1NWCzSnzzD0vTpKD20-hMEELQoJRU4k/edit

## Easier components documentation
http://devfactory-components.ecs.devfactory.com/

## Protractor automation helper node package
Repository

https://github.com/trilogy-group/protractor-automation-helper

Documentation

https://trilogy-group.github.io/protractor-automation-helper/

## Recommended style guide

https://github.com/CarmenPopoviciu/protractor-styleguide

## Training references

-https://www.w3schools.com/js/

-https://www.typescriptlang.org/

-https://www.tutorialspoint.com/typescript/

-http://www.protractortest.org/


## This repo has been created from base repo

https://github.com/trilogy-group/common-automation-framework-protractor/