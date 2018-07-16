import {ComponentHelpers} from '../../../devfactory/component-helpers/component-helpers';
import {ModalComponentSelectors} from '../modal-component/modal-component-selectors';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {TextComponentSelectors} from '../../../devfactory/component-types/text-component/text-component-selectors';

export class ListComponentSelectors {
  public static getListItemByTextXpath(
    text: string,
    isContains = false,
    insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(
      insidePopup)}//${
        HtmlHelper.tags.listItem
      }[${ComponentHelpers.getXPathFunctionForText(
        text,
        isContains
      )}]`;
  }

  public static getListItemByClassAndTextXpath(
    classAttributeValue: string,
    textAttributeValue: string,
    classIsContains = false,
    textIsContains = false,
    insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
            ${ComponentHelpers.getXpathFunctionClassAndText(
                HtmlHelper.tags.listItem,
                classAttributeValue,
                textAttributeValue,
                classIsContains,
                textIsContains
            )}`;
  }

  public static getListItemByClassAndDotXpath(
    classAttributeValue: string,
    dotAttributeValue: string,
    classIsContains = false,
    dotIsContains = false,
    insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
            ${ComponentHelpers.getXpathFunctionClassAndDot(
                HtmlHelper.tags.listItem,
                classAttributeValue,
                dotAttributeValue,
                classIsContains,
                dotIsContains
            )}`;
  }

  public static getListItemByClass(
    classAttributeValue: string,
    isContains = false,
    insidePopup = false
  ) {
  return `${ModalComponentSelectors.getModelPopupXpath(
    insidePopup)}//${
      HtmlHelper.tags.listItem
    }[${ComponentHelpers.getXPathFunctionForClass(
      classAttributeValue,
      isContains
    )}]`;
  }

  public static getDivInsideListItemByNgRepeatAndClassXpath(
    ngRepeatAttributeValue: string,
    classAttributeValue: string,
    containsNgRepeat = false,
    containsClass = false,
    insidePopup = false
      ) {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
        //${HtmlHelper.tags.listItem}[${ComponentHelpers.getXPathFunctionForNgRepeat(
                   ngRepeatAttributeValue,
                   containsNgRepeat
                 )}]${TextComponentSelectors.getDivTextByClassXpath(
                  classAttributeValue,
                  containsClass
                )}`;
    }
}
