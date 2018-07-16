import {SuiteNames} from '../../helpers/suite-names';
import {PageHelper} from '../../../components/html/page-helper';
import {LoginPageHelper} from '../../../page-objects/pages/login/login-page.helper';
import {StepLogger} from '../../../../core/logger/step-logger';
import {CommonPageConstants} from '../../../page-objects/pages/common/common-page.constants';
import {LoginPage} from '../../../page-objects/pages/login/login.po';
import {LoginPageValidations} from '../../../page-objects/pages/login/login-page.validations';
import {LoginPageConstants} from '../../../page-objects/pages/login/login-page.constants';
import {CommonPageValidations} from '../../../page-objects/pages/common/common-page.validations';
import {CommonPageHelper} from '../../../page-objects/pages/common/common-page.helper';

describe(SuiteNames.regressionSuite, () => {
    let loginPage: LoginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();
        await loginPage.goTo();
        await LoginPageHelper.verifyLoginPage();
    });

    it('Verify Login screen - Screen Elements Check - [1]', async () => {
        const stepLogger = new StepLogger(1);

        stepLogger.stepId(2);
        stepLogger.verification('Username field is enabled');
        await expect(await PageHelper.isElementEnabled(LoginPage.emailAddressTextBox, true))
        .toBe(true, LoginPageValidations.getFieldDisplayedValidation(
            CommonPageConstants.emailLabel));
        stepLogger.verification('Password field is enabled');
        await expect(await PageHelper.isElementEnabled(LoginPage.passwordTextBox, true))
        .toBe(true, LoginPageValidations.getFieldDisplayedValidation(
            CommonPageConstants.passwordLabel));

        stepLogger.stepId(3);
        stepLogger.verification('Verify  Remember me checkbox displayed');
        await expect(await PageHelper.isElementDisplayed(LoginPage.loginPageRemebermeCheckBox, true))
        .toBe(true, LoginPageValidations.getFieldDisplayedValidation(
            LoginPageConstants.remembermeCheckLabel));

        stepLogger.stepId(4);
        stepLogger.verification('Verify Forgot password? Link displayed');
        await expect(await PageHelper.isElementDisplayed(LoginPage.loginPageForgotPasswordLink, true))
        .toBe(true, LoginPageValidations.getFieldDisplayedValidation(
            LoginPageConstants.forgotPasswordLabel));
    });

    it('Verify login with invalid username and password - [2]', async () => {
        const stepLogger = new StepLogger(2);

        stepLogger.stepId(2);
        stepLogger.step('Enter wrong credentials and click on login');
        await LoginPageHelper.loginToAppInvalidCred();
        stepLogger.verification('Message "Bad Credentials" should appear below the login button');
        await expect(await PageHelper.isElementDisplayed(LoginPage.homePageLoginError, true))
        .toBe(true, CommonPageValidations.getDisplayedValidation(
            LoginPageConstants.homePageLoginError));
    });

    it('Verify login with valid username and password   - [3]', async () => {
        const stepLogger = new StepLogger(3);

        stepLogger.stepId(2);
        stepLogger.step('Enter valid credentials and click on login button');
        await LoginPageHelper.loginToApp();
        stepLogger.verification('User should be able to login to the application');
        await expect(await PageHelper.isElementDisplayed(LoginPage.topBarUserLink, true))
        .toBe(true, CommonPageValidations.getDisplayedValidation(
            LoginPageConstants.topBaruserLink));
        stepLogger.verification('Sidebar should be loaded');
        await expect(await PageHelper.isElementDisplayed(LoginPage.homePageSidebar, true))
        .toBe(true, CommonPageValidations.getDisplayedValidation(
            LoginPageConstants.sideBar));
        stepLogger.step('Logout from the application');
        await CommonPageHelper.logout();
    });
});
