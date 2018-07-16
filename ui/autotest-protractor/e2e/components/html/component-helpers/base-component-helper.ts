import {ComponentHelpersFactory, ModelComponentSelectorsFactory} from '@aurea/protractor-automation-helper';
import {ComponentHelpers} from '../../devfactory/component-helpers/component-helpers';

export class BaseComponentHelper extends ComponentHelpersFactory {

  public static getSpecificTagByDisabledAttributeXpath(
    tag: string,
    disableAttributeValue: string,
    isContains = false,
    insidePopup = false ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}//${tag}[${ComponentHelpers.getXPathFunctionForDisabled
      (disableAttributeValue, isContains )}]`;
  }

  public static getIdXpath(
    tag: string,
    idAttributeValue: string,
    isContains = false,
    insidePopup = false
    ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}//${tag}[${ComponentHelpers.getXPathFunctionForId
      (idAttributeValue, isContains)}]`;
  }

  public static getClassXpath(
    tag: string,
    classAttributeValue: string,
    isContains = false,
    insidePopup = false) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${tag}[${ComponentHelpers.getXPathFunctionForClass(classAttributeValue, isContains )}]`;
  }

  public static getTextXpath(
    tag: string,
    text: string,
    isContains = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${tag}[${ComponentHelpersFactory.getXPathFunctionForDot(text,
      isContains
    )}]`;
  }
}
