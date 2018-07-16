import {By, element} from 'protractor';
import {CommonPage} from '../common/common.po';
import {BasePage} from '../base-page';
import {CommonPageConstants} from '../common/common-page.constants';
import {LoginPageConstants} from './login-page.constants';

export class LoginPage extends BasePage {
    url = '/login';

    static get emailAddressTextBox() {
        return element(By.id('email'));
    }

    static get passwordTextBox() {
        return element(By.id('password'));
    }

    static get loginButton() {
        return CommonPage.getButtonByText(LoginPageConstants.loginButtonText);
    }

    static get topBarUserLink() {
        return element(By.className('df-user-profile__img ng-star-inserted'));
    }

    static get loginPageRemebermeCheckBox() {
        return CommonPage.getSpanContainsClass(LoginPageConstants.loginPageRemembermeCheckClass);
    }

    static get loginPageForgotPasswordLink() {
        return CommonPage.getAnchorContainsText(LoginPageConstants.forgotPasswordLabel);
    }

    static get logoutLink() {
        return CommonPage.getButtonContainsText(CommonPageConstants.logOutLabel);
    }

    static get homePageSidebar() {
        return CommonPage.getDivContainsClass(LoginPageConstants.homePageSideBarClass);
    }

    static get homePageLoginError() {
        return CommonPage.getParagraphContainsText(LoginPageConstants.homePageLoginError);
    }
}
