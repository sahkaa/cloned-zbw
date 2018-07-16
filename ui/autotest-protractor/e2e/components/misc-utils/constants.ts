import {ConstantsFactory} from '@aurea/protractor-automation-helper';

export class Constants extends ConstantsFactory {
    static readonly MAX_RETRY_ATTEMPTS = 3;
    static readonly MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    static get symbols() {
        return {
            comma: ',',
            dot: '.'
        };
    }

    static get keys() {
        return {
            escape: 'protractor.Key.ESCAPE'
        };
    }

    static get booleanValues() {
        return {
            true: 'true',
            false: 'false'
        };
    }
}
