import {LoaderComponentSelectorsFactory} from '@aurea/protractor-automation-helper';

export class LoaderComponentSelectors extends LoaderComponentSelectorsFactory {
    public static readonly selector = 'df-loading-spinner';

    public static getControlXPath() {
        return `//${this.selector}`;
    }
}
