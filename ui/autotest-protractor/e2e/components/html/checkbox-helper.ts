import {ElementFinder} from 'protractor';
import {Constants} from '../misc-utils/constants';
import {WaitHelper} from './wait-helper';

export class CheckboxHelper {
    static async markCheckbox(elementt: ElementFinder, markChecked: boolean) {
        await WaitHelper.getInstance().waitForElementToBeClickable(elementt);
        let attempts = 0;
        // Retry mark checkbox if previous try fails.  This is
        // useful on slow envs like on remote executions.
        while (attempts++ < Constants.MAX_RETRY_ATTEMPTS) {
            const isSelected = await elementt.isSelected();
            if ((isSelected && !markChecked) || (!isSelected && markChecked)) {
                return elementt.click();
            }
        }
        return;
    }
}
