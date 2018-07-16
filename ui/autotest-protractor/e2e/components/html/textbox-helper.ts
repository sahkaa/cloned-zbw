import {browser, ElementFinder, protractor} from 'protractor';
import {WaitHelper} from './wait-helper';
import {PageHelper} from './page-helper';
import {HtmlHelper} from '../misc-utils/html-helper';

export class TextboxHelper {
    /**
     * Clears the existing text from an input elements
     * @param {ElementFinder} locator
     */
    public static async clearText(locator: ElementFinder) {
        let ctrl = protractor.Key.CONTROL;

        if (browser.platform.indexOf('Mac')) {
            ctrl = protractor.Key.COMMAND;
        }
        const command = protractor.Key.chord(ctrl, 'a') + protractor.Key.BACK_SPACE;
        await locator.sendKeys(command);
        await locator.clear();
    }

    /**
     * Send Keys to an input elements once it becomes available
     * @param {ElementFinder} locator for element
     * @param {string} value to be sent
     * @param {boolean} sendEnter for sending an enter key
     */
    public static async sendKeys(locator: ElementFinder,
                                 value: string,
                                 sendEnter = false) {
        await WaitHelper.getInstance().waitForElementToBeDisplayed(locator);
        await this.clearText(locator);

        // On IE, text is sometimes not well sent, this is a workaround
        await locator.sendKeys(value);
        if (sendEnter) {
            await locator.sendKeys(protractor.Key.ENTER);
        }
    }

    /**
     * Checks whether an input box has particular value or not
     * @param {ElementFinder} locator
     * @param {string} text
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    public static async hasValue(locator: ElementFinder, text: string) {
        const val = await PageHelper.getAttributeValue(
            locator,
            HtmlHelper.attributes.value
        );
        return val === text;
    }
}
