export class CommonPageValidations {
    static getFieldHasValueValidation(fieldLabel: string, value: string) {
        return `Field ${fieldLabel} has value as ${value}`;
    }

    static getPageDisplayedValidation(name: string) {
        return `Page ${this.getDisplayedValidation(name)}`;
    }

    static getFieldDisplayedValidation(name: string) {
        return `Field ${this.getDisplayedValidation(name)}`;
    }

    static getDisplayedValidation(name: string) {
        return `${name} should be displayed`;
    }

    static getNotDisplayedValidation(name: string) {
        return `${name} should not be displayed`;
    }

    static getButtonDisplayedValidation(name: string) {
        return `Button ${this.getDisplayedValidation(name)}`;
    }

    static getMsgDisplayedValidation(msg: string) {
        return `Message ${this.getDisplayedValidation(msg)}`;
    }

    static getLinkDisplayedValidation(name: string) {
        return `Link ${this.getDisplayedValidation(name)}`;
    }

    static dataSortedInDescendingOrderInTable(column: string) {
        return `${column} column data is not sorted in descending order in the table`;
    }

    static getLinkNotDisplayedValidation(name: string) {
        return `Link ${this.getNotDisplayedValidation(name)}`;
    }
}
