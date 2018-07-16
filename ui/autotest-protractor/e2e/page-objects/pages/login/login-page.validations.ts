import {CommonPageValidations} from '../common/common-page.validations';
export class LoginPageValidations {
    static getFieldDisplayedValidation(name: string) {
        return `Field ${CommonPageValidations.getDisplayedValidation(name)}`;
    }
}
