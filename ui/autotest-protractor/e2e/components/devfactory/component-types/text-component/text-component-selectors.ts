import {ModelComponentSelectorsFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {ComponentHelpers} from '../../component-helpers/component-helpers';
import {ModalComponentSelectors} from '../../../html/component-types/modal-component/modal-component-selectors';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';

export class TextComponentSelectors {

  public static getSpanByTextXpath(
    text: string,
    textIsContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getTextXpath(
      HtmlHelper.tags.span,
      text,
      textIsContains,
      insidePopup
    );
  }

  public static getAnchorByTextXpath(
    text: string,
    textIsContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getTextXpath(
      HtmlHelper.tags.anchor,
      text,
      textIsContains,
      insidePopup
    );
  }

  public static getDivByTextXpath(
    text: string,
    isContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getTextXpath(
      HtmlHelper.tags.div,
      text,
      isContains,
      insidePopup
    );
  }

  public static getHeaderSixByTextXpath(
    text: string,
    isContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getTextXpath(
      HtmlHelper.tags.h6,
      text,
      isContains,
      insidePopup
    );
  }

  public static getHeaderTextInsideDivByClassXpath(
    text: string,
    className: string,
    isContains = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${HtmlHelper.tags.div}[${ComponentHelpers.getXPathFunctionForClass(className, isContains)}]
            ${this.getHeaderSixByTextXpath(text)}`;
  }

  public static getTextByClassXpath(
    tag: string,
    className: string,
    isContains = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${tag}[${ComponentHelpers.getXPathFunctionForClass(className,
      isContains
    )}]`;
  }

  public static getDivTextByClassXpath(
    className: string,
    classIsContains = false,
    insidePopup = false
  ) {
    return this.getTextByClassXpath(
      HtmlHelper.tags.div,
      className,
      classIsContains,
      insidePopup
    );
  }

  public static getTextInsideDivByClassAndNotDotXpath(
    classAttributeValue: string,
    textAttributeValue: string,
    classIsContains = false,
    textIsContains = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            ${ComponentHelpers.getXpathFunctionClassComparisonAndNotDot(
              HtmlHelper.tags.div,
              classAttributeValue,
              textAttributeValue,
              classIsContains,
              textIsContains
            )}`;
  }

  public static getTooltipForDivByClass(
    classAttributeValue: string,
    toolTipAttributeValue: string,
    isContains = false,
    insidePopup = false
      ) {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                 ${this.getTextByClassXpath(
                   HtmlHelper.tags.div,
                   classAttributeValue,
                   isContains
                 )}[${ComponentHelpers.getXPathFunctionForTooltip(
                      toolTipAttributeValue, true)}]`;
          }

  public static getTextInsideDivByClassAndTextXpath(
    classAttributeValue: string,
    textAttributeValue: string,
    classIsContains = false,
    textIsContains = false,
    insidePopup = false)   {
          return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                          ${ComponentHelpers.getXpathFunctionClassAndText(
                        HtmlHelper.tags.div,
                        classAttributeValue,
                        textAttributeValue,
                        classIsContains,
                        textIsContains
                      )}`;
  }

  public static getSpanByClassXpath(
    classAttributeValue: string,
    isContains = false,
    insidePopup = false
  ) {
          return BaseComponentHelper.getClassXpath(
            HtmlHelper.tags.span,
            classAttributeValue,
            isContains, insidePopup
    );
  }

  public static getHeaderFiveByTextXpath(
    text: string,
    isContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getTextXpath(
      HtmlHelper.tags.h5,
      text,
      isContains,
      insidePopup
    );
  }

  public static getDivByClassXpath(
    classAttributeValue: string,
    classIsContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getClassXpath(
      HtmlHelper.tags.div,
      classAttributeValue,
      classIsContains, insidePopup
    );
  }

  public static getIcontagByClassXpath(
    iAttributeValue: string,
    classIsContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getClassXpath(
      HtmlHelper.tags.icon,
      iAttributeValue,
      classIsContains,
      insidePopup
    );
  }

  public static getTextareaByIdXpath(
    idAttributeValue: string,
    idIsContains = false,
    insidePopup = false
    ) {
    return BaseComponentHelper.getIdXpath(
            HtmlHelper.tags.textarea,
            idAttributeValue,
            idIsContains,
            insidePopup
          );
   }

  public static getHeaderFiveByClassXpath(
       text: string,
       classIsContains = false,
       insidePopup = false
       ) {
         return BaseComponentHelper.getClassXpath(
           HtmlHelper.tags.h5,
           text,
           classIsContains,
           insidePopup
         );

  }

  public static getParagraphByTextXpath(
    text: string,
    contains = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}//${
      HtmlHelper.tags.paragraph}[${ComponentHelpers.getXPathFunctionForText(
        text,
        contains)}]`;
  }

  public static getTextInsideDivAndListByClassXpath(
    textValue: string,
    className: string,
    containsText = false,
    containsClass = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${HtmlHelper.tags.div}[${
              ComponentHelpers.getXPathFunctionForText(textValue,
                containsText)}]//parent::${HtmlHelper.tags.listItem}//${HtmlHelper.tags.div}[${
                  ComponentHelpers.getXPathFunctionForClass(className,
                    containsClass)}]`;
  }

  public static getSpanByTextAndAreaExpandedXpath(
    textValue: string,
    areaExpandedAttributeVal: string,
    containsText = false,
    areaExpandedContains = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${HtmlHelper.tags.span}[${
              ComponentHelpers.getXPathFunctionForText(textValue,
                containsText)}]//parent::${HtmlHelper.tags.anchor}[${
                  ComponentHelpers.getXPathFunctionForAreaExpanded(areaExpandedAttributeVal,
                    areaExpandedContains)}]`;
  }

  public static getTextInsideDivAndIconByClassXpath(
    textValue: string,
    className: string,
    containsText = false,
    containsClass = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${HtmlHelper.tags.div}[${
              ComponentHelpers.getXPathFunctionForText(textValue,
                containsText)}]//parent::${HtmlHelper.tags.listItem}//${HtmlHelper.tags.icon}[${
                  ComponentHelpers.getXPathFunctionForClass(className,
                    containsClass)}]`;
  }

  public static getDivByClassInsideListByClassXpath(
    listAttributeValue: string,
    divAttributeValue: string,
    classContains = false,
    insidePopup = false)   {
    return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}${BaseComponentHelper.getClassXpath
    (HtmlHelper.tags.listItem, listAttributeValue, classContains, insidePopup)}${BaseComponentHelper.getClassXpath
    (HtmlHelper.tags.div, divAttributeValue, classContains, insidePopup)}`;
  }

  public static getTextInsideSpanByClassAndTextXpath(
    classAttributeValue: string,
    textAttributeValue: string,
    classIsContains = false,
    textIsContains = false,
    insidePopup = false)   {
          return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                          ${ComponentHelpers.getXpathFunctionClassAndText(
                        HtmlHelper.tags.span,
                        classAttributeValue,
                        textAttributeValue,
                        classIsContains,
                        textIsContains
                      )}`;
  }

  public static getAnchorByNgHrefXpath(
    ngHrefAttributeVal: string,
    containsValue = false,
    insidePopup = false
  ) {
    return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
            //${HtmlHelper.tags.anchor}[${
                  ComponentHelpers.getXPathFunctionForNgHref(ngHrefAttributeVal,
                    containsValue)}]`;
  }

  public static getAnchorByClassXpath(
    classAttributeValue: string,
    classIsContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getClassXpath(
      HtmlHelper.tags.anchor,
      classAttributeValue,
      classIsContains, insidePopup
    );
  }
}
