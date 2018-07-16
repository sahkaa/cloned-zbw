import {TextboxHelper} from '../../../components/html/textbox-helper';
import {PageHelper} from '../../../components/html/page-helper';
import {LoginPage} from './login.po';
import {CommonPageHelper} from '../common/common-page.helper';
import {LoginPageConstants} from './login-page.constants';
import {CommonPageValidations} from '../common/common-page.validations';

export class LoginPageHelper {
    static async login(emailId: string, password: string) {
        // *Step* - Enter Username
        await TextboxHelper.sendKeys(LoginPage.emailAddressTextBox, emailId);
        // *Step* - Enter Password
        await TextboxHelper.sendKeys(LoginPage.passwordTextBox, password);
        // *Step* - Click on "LOGIN" button.
        await PageHelper.click(LoginPage.loginButton);
    }

    static async loginToApp() {
        await this.login(
            CommonPageHelper.email,
            CommonPageHelper.userPassword
        );
    }

    static async loginToAppInvalidCred() {
        await this.login(
            CommonPageHelper.invalidemail,
            CommonPageHelper.InvalidPassword
        );
    }

    static async verifyLoginPage() {
        // *Verification* - Verify Login page opens
        await expect(await PageHelper.isElementDisplayed(LoginPage.loginButton, true))
        .toBe(true, CommonPageValidations.getButtonDisplayedValidation(
            LoginPageConstants.loginButtonText));
    }
}
