import {ComponentHelpers} from '../../../devfactory/component-helpers/component-helpers';
import { ModalComponentSelectors } from '../modal-component/modal-component-selectors';

export class AnchorComponentSelectors {
  public static readonly selectorTag = 'a';

  public static getAnchorByHrefXpath(
    href: string,
    isContains = false,
    insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(
      insidePopup)}//${
        this.selectorTag
      }[${ComponentHelpers.getXPathFunctionForHref(
        href,
        isContains
      )}]`;
  }
}
