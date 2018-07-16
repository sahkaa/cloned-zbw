const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');
exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    suites: defaultConfigSetup.suites,
    multiCapabilities: defaultConfigSetup.multiCapabilities,
    params: defaultConfigSetup.params,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    seleniumAddress: defaultConfigSetup.params.selenium.hub,
    onPrepare() {
        reportersSetup.configureAllReporters();
    },
    onComplete: reportersSetup.testRailSetupOnComplete
};