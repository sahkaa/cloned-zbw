const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');
exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    suites: defaultConfigSetup.suites,
    multiCapabilities: defaultConfigSetup.multiCapabilities,
    params: defaultConfigSetup.params,
    directConnect: true,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    // Called once the tests have finished running and the WebDriver instance has been shut down
    onPrepare: function () {
        reportersSetup.configureAllReporters();
    },
    onComplete: reportersSetup.testRailSetupOnComplete
};