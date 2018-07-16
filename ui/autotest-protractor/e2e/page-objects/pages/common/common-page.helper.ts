import {browser} from 'protractor';
import {PageHelper} from '../../../components/html/page-helper';
import {LoginPage} from '../login/login.po';
import {LoginPageHelper} from '../login/login-page.helper';

export class CommonPageHelper {
    static get email(): string {
        return browser.params.login.user.email;
    }

    static get userPassword(): string {
        return browser.params.login.user.password;
    }

    static get invalidemail(): string {
        return browser.params.login.invalidUser.email;
    }

    static get InvalidPassword(): string {
        return browser.params.login.invalidUser.password;
    }

    static async logout() {
        const userLink = LoginPage.topBarUserLink;
        const isPresent = await PageHelper.isElementPresent(userLink);
        if (isPresent) {
            // Need to wait for the welcome link appearing
            await browser.sleep(PageHelper.timeout.xs);
            await PageHelper.click(userLink);
            // Need to wait for the log out link appearing
            await browser.sleep(PageHelper.timeout.xs);
            // Click on Logout
            await PageHelper.click(LoginPage.logoutLink);
            // *Verification* - 'Account Login' screen is displayed
            LoginPageHelper.verifyLoginPage();
        }
    }
}
