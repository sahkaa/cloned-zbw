import { HtmlHelper } from '../../../misc-utils/html-helper';
import { ComponentHelpers } from '../../../devfactory/component-helpers/component-helpers';
import { ComponentHelpersFactory } from '@aurea/protractor-automation-helper';

export class ModalComponentSelectors {
  public static get getPopupXpath() {
    return `//${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForClass('modal-dialog')}]`;
  }

  public static getModelPopupXpath(insidePopup: boolean) {
    return insidePopup ? this.getPopupXpath : '';
  }

  public static get getModalPopupBodyXpath() {
    return `${this.getPopupXpath}//${HtmlHelper.tags.h5}`;
  }

  public static getModalPopupBodyByTextXpath(modalHeader: string) {
    return `${this.getModalPopupBodyXpath}`
        + `[${ComponentHelpersFactory.getXPathFunctionForText(modalHeader)}]`;
  }
}
