import {Page} from '../contracts/page';
import {browser} from 'protractor';
import {PageHelper} from '../../components/html/page-helper';

export class BasePage implements Page {
    titleText: string;
    url: string;

    async goTo() {
        browser.waitForAngularEnabled(false);
        return this.get(this.url);
    }

    async get(url: string) {
        return browser.get(url, PageHelper.DEFAULT_TIMEOUT);
    }

    async verifyExistence() {
        const currentUrl = await browser.getCurrentUrl();
        return currentUrl.indexOf(this.url) > -1;
    }
}
