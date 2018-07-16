import {ComponentHelpers} from '../../../devfactory/component-helpers/component-helpers';
import {ModalComponentSelectors} from '../modal-component/modal-component-selectors';
import {HtmlHelper} from '../../../misc-utils/html-helper';

export class IconComponentSelectors {

  public static getIconByClass(
  classAttributeValue: string,
  isContains = false,
  insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
      //${HtmlHelper.tags.icon}[${ComponentHelpers.getXPathFunctionForClass(
      classAttributeValue,
      isContains
    )}]`;
  }
}
