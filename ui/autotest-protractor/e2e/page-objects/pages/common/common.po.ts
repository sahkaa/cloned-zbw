import {TextComponentSelectors} from '../../../components/devfactory/component-types/text-component/text-component-selectors';
import {element, By} from 'protractor';
import {AnchorComponentSelectors} from '../../../components/html/component-types/anchor-component/anchor-component-selectors';
import {ButtonComponentSelectors} from '../../../components/devfactory/component-types/button-component/button-component-selectors';
import {GridComponentSelectors} from '../../../components/devfactory/component-types/grid-component/grid-component-selectors';
import {ListComponentSelectors} from '../../../components/html/component-types/list-component/list-component-selectors';
import {TextBoxComponentSelectors} from '../../../components/devfactory/component-types/textbox-component/textbox-component-selectors';
import {IconComponentSelectors} from '../../../components/html/component-types/icon-component/icon-component-selectors';
import {BasePage} from '../base-page';

export class CommonPage extends BasePage {
    static getAllAnchorByHref(text: string) {
      const xpath = AnchorComponentSelectors.getAnchorByHrefXpath (text);
      return element.all (By.xpath (xpath)).first ();
    }

    static getAllAnchorByText (text: string, textIsContains = false, insidePopup = false) {
      return element.all (By.xpath (TextComponentSelectors.getAnchorByTextXpath (text, textIsContains, insidePopup)));
    }

    static getAnchorByText (text: string, textIsContains = false, insidePopup = false) {
      return this.getAllAnchorByText(text, textIsContains, insidePopup).first();
    }

    static getAnchorContainsText (text: string) {
      return this.getAnchorByText(text, true);
    }

    static getAllAnchorsByClass (classAttributeValue: string, classIsContains = false, insidePopup = false) {
      return element.all (By.xpath (TextComponentSelectors.getAnchorByClassXpath (classAttributeValue, classIsContains, insidePopup)));
    }

    static getAnchorByClass (classAttributeValue: string, classIsContains = false, insidePopup = false) {
      return this.getAllAnchorsByClass(classAttributeValue, classIsContains, insidePopup).first();
    }

    static getAnchorContainsClass (classAttributeValue: string) {
      return this.getAnchorByClass(classAttributeValue, true);
    }

    static getAllSpanByText (text: string, textIsContains = false, insidePopup = false) {
      return element.all (By.xpath (TextComponentSelectors.getSpanByTextXpath (text, textIsContains, insidePopup)));
    }

    static getSpanByText (text: string, textIsContains = false, insidePopup = false) {
      return this.getAllSpanByText(text, textIsContains, insidePopup).first();
    }

    static getSpanContainsText (text: string) {
      return this.getSpanByText(text, true);
    }

    static getAllSpanByClassAndText (
      classAttribute: string,
      text: string,
      classIsContains = false,
      textIsContains = false,
      insidePopup = false) {
        return element.all(By.xpath (TextComponentSelectors.getTextInsideSpanByClassAndTextXpath (
          classAttribute, text, classIsContains, textIsContains, insidePopup)));
    }

    static getSpanByClassAndText (
      classAttribute: string,
      text: string,
      classIsContains = false,
      textIsContains = false,
      insidePopup = false) {
      return this.getAllSpanByClassAndText(classAttribute,  text, classIsContains, textIsContains, insidePopup).first();
    }

    static getSpanContainsClassAndText (classAttribute: string, text: string) {
      return this.getSpanByClassAndText(classAttribute, text, true, true);
    }

    static getAllSpansContainText (text: string) {
      return this.getAllSpanByText(text, true);
    }

    static getAllSpanByClass (text: string, classIsContains = false, insidePopup = false) {
      return element.all (By.xpath (TextComponentSelectors.getSpanByClassXpath (text, classIsContains, insidePopup)));
    }

    static getSpanByClass (text: string, classIsContains = false, insidePopup = false ) {
      return this.getAllSpanByClass(text, classIsContains, insidePopup ).first();
    }

    static getSpanContainsClass (text: string) {
      return this.getSpanByClass(text, true);
    }

    static getAllDivTextByClass (text: string, classIsContains = false, insidePopup = false) {
      return element.all (By.xpath (TextComponentSelectors.getDivTextByClassXpath(text, classIsContains, insidePopup)));
    }

    static getDivTextByClass (text: string, classIsContains = false, insidePopup = false) {
      return this.getAllDivTextByClass(text, classIsContains, insidePopup).first();
    }

    static getDivTextContainsClass (text: string) {
      return this.getDivTextByClass(text, true);
    }

    static getAllDivTextContainsClass (text: string) {
      return this.getAllDivTextByClass(text, true);
         }

    static getAllHeaderFiveByText(text: string, textIsContains = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getHeaderFiveByTextXpath(text, textIsContains, insidePopup)));
    }

    static getHeaderFiveByText(text: string, textisContains = false, insidePopup = false) {
      return this.getAllHeaderFiveByText(text, textisContains, insidePopup).first();
    }

    static getHeaderFiveContainsText(text: string) {
      return this.getHeaderFiveByText (text, true);
    }

    static getAllDivsByClass(text: string, containsClass = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getDivByClassXpath(text, containsClass , insidePopup)));
    }

    static getDivByClass (text: string, containsClass = false, insidePopup = false) {
      return this.getAllDivsByClass(text, containsClass, insidePopup ).first();
    }

    static getDivContainsClass (text: string) {
      return this.getDivByClass(text, true);
    }

    static getAllDivsContainsClass (text: string) {
      return this.getAllDivsByClass(text, true);
    }

    static getAllButtonsById(text: string, idIsContains = false, insidePopup = false) {
      return element.all(By.xpath(ButtonComponentSelectors.getButtonByIdXpath(text, idIsContains, insidePopup)));
    }

    static getButtonById (text: string, idIsContains = false, insidePopup = false) {
      return this.getAllButtonsById(text, idIsContains, insidePopup ).first();
    }

    static getButtonContainsId (text: string) {
      return this.getButtonById(text, true);
    }

    static getAllCellByClass(text: string, classIsContains = false, insidePopup = false) {
      return element.all (By.xpath(GridComponentSelectors.getCellByClassXpath(text, classIsContains, insidePopup )));
    }

    static getCellByClass(text: string, classIsContains = false, insidePopup = false) {
      return this.getAllCellByClass(text, classIsContains, insidePopup ).first();
    }

    static getCellContainsClass (text: string) {
      return this.getCellByClass(text, true);
    }

    static getAllIconTagByClass(text: string, classIsContains = false, insidePopup = false) {
      return element.all (By.xpath(TextComponentSelectors.getIcontagByClassXpath(text, classIsContains , insidePopup)));
    }

    static getIcontagByClass(text: string, classIsContains = false, insidePopup = false) {
      return this.getAllIconTagByClass(text, classIsContains, insidePopup ).first();
    }

    static getIconTagContainsClass (text: string) {
      return this.getIcontagByClass(text, true);
    }

    static getAllIconsTagContainsClass (text: string) {
      return this.getAllIconTagByClass(text, true);
    }

    static getAllListItemByClassAndDot(mode: string, label: string, classIsContains = false, dotIsContains = false, insidePopup = false) {
      return element.all(By.xpath(
        ListComponentSelectors.getListItemByClassAndDotXpath(mode, label, classIsContains, dotIsContains, insidePopup )));
    }

    static getListItemByClassAndDot(mode: string, label: string, classIsContains = false, dotIsContains = false, insidePopup = false) {
      return this.getAllListItemByClassAndDot(mode, label, classIsContains, dotIsContains, insidePopup ).first();
    }

    static getListItemContainsClassAndDot(mode: string, label: string) {
      return this.getListItemByClassAndDot(mode, label, true);
    }

    static getAllDivByText (text: string, textIsContains = false, insidePopup = false) {
      return element.all (By.xpath (TextComponentSelectors.getDivByTextXpath (text, textIsContains, insidePopup)));
    }

    static getDivByText (text: string, textIsContains = false, insidePopup = false) {
      return this.getAllDivByText(text, textIsContains, insidePopup).first();
    }

    static getDivContainsText(text: string) {
      return this.getDivByText(text, true);
    }

    static getAllDivsContainText(text: string) {
      return this.getAllDivByText(text, true);
    }

    static getAllHeaderSixByText(text: string, textIsContains = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getHeaderSixByTextXpath(text, textIsContains, insidePopup)));
    }

    static getHeaderSixByText(text: string, textIsContains = false, insidePopup = false) {
      return this.getAllHeaderSixByText(text, textIsContains, insidePopup).first();
    }

    static getHeaderSixContainsText(text: string) {
      return this.getHeaderSixByText (text, true);
    }

   static getAllButtonsByText(text: string, textIsContains = false, insidePopup = false) {
      return element.all(By.xpath(ButtonComponentSelectors.getButtonByTextXpath(text, textIsContains, insidePopup)));
    }

    static getButtonByText(text: string, textIsContains = false, insidePopup = false) {
      return this.getAllButtonsByText(text, textIsContains, insidePopup).first();
    }

    static getButtonContainsText(text: string) {
      return this.getButtonByText(text, true);
    }

    static getAllInputByClass(text: string, classIsContains = false, insidePopup = false) {
      return element.all(By.xpath(TextBoxComponentSelectors.getInputByClassXpath(text, classIsContains, insidePopup)));
    }

    static getInputByClass(text: string, classIsContains = false, insidePopup = false) {
      return this.getAllInputByClass(text, classIsContains, insidePopup).first();
    }

    static getInputContainsClass(text: string) {
      return this.getInputByClass(text, true);
    }

    static getAllListItemByText (text: string, textIsContains = false, insidePopup = false) {
      return element.all(By.xpath(ListComponentSelectors
        .getListItemByTextXpath(text, textIsContains, insidePopup)));
    }

    static getListItemByText (text: string, textIsContains = false, insidePopup = false) {
      return this.getAllListItemByText(text, textIsContains, insidePopup).first();
    }

    static getListItemContainsText (text: string) {
      return this.getListItemByText(text, true);
    }

    static getAllListsItemByClassAndText (
      classAttributeVal: string, text: string,
      classIsContains = false, textIsContains = false, insidePopup = false) {
      return element.all(By.xpath(ListComponentSelectors.getListItemByClassAndTextXpath(
          classAttributeVal, text, classIsContains, textIsContains, insidePopup)));
    }

    static getListItemByClassAndText (
      classAttributeVal: string, text: string, classIsContains = false,
      textIsContains = false, insidePopup = false) {
      return this.getAllListsItemByClassAndText(
        classAttributeVal, text, classIsContains, textIsContains, insidePopup).first();
    }

    static getListItemContainsClassAndText (
      classAttributeVal: string, text: string) {
      return this.getListItemByClassAndText(classAttributeVal, text, true, true);
    }

    static getAllListsItemContainsClassAndText (classAttributeVal: string, text: string) {
      return this.getAllListsItemByClassAndText(classAttributeVal, text, true, true);
    }

    static getAllListItemByClass (text: string, classIsContains = false, insidePopup = false) {
      return element.all(By.xpath(ListComponentSelectors
        .getListItemByClass(text, classIsContains, insidePopup)));
    }

    static getListItemByClass (text: string, classIsContains = false, insidePopup = false) {
      return this.getAllListItemByClass(text, classIsContains, insidePopup).first();
    }

    static getListItemContainsClass (text: string) {
      return this.getListItemByClass(text, true);
    }

    static getAllListItemContainsClass (text: string) {
      return this.getAllListItemByClass(text, true);
    }

    static getAllTextsInsideDivByClassAndText (
      classAttributeValue: string, text: string, containsClass = false, containsText= false, insidePopup = false) {
        return element.all(By.xpath(TextComponentSelectors.getTextInsideDivByClassAndTextXpath(
          classAttributeValue, text, containsClass, containsText, insidePopup)));
    }

    static getTextInsideDivByClassAndText (
      classAttributeValue: string, text: string, containsClass = false, containsText= false, insidePopup = false) {
        return this.getAllTextsInsideDivByClassAndText(
          classAttributeValue, text, containsClass, containsText, insidePopup).first();
    }

    static getTextInsideDivContainsClassAndText (classAttributeValue: string, text: string) {
      return this.getTextInsideDivByClassAndText(classAttributeValue, text, true, true);
    }

    static getAllTextsInsideDivContainsClassAndText (classAttributeValue: string, text: string) {
      return this.getAllTextsInsideDivByClassAndText(classAttributeValue, text, true, true);
    }

    static getAllTextInsideDivByClassAndNotDot (
      classAttributeValue: string, text: string, containsClass = false, containsText= false, insidePopup = false) {
        return element.all(By.xpath(TextComponentSelectors.getTextInsideDivByClassAndNotDotXpath(
          classAttributeValue, text, containsClass, containsText, insidePopup)));
    }

    static getTextInsideDivByClassAndNotDot (
      classAttributeValue: string, text: string, containsClass = false, containsText= false, insidePopup = false) {
      return this.getAllTextInsideDivByClassAndNotDot(
        classAttributeValue, text, containsClass, containsText, insidePopup).first();
    }

    static getTextInsideDivContainsClassAndNotDot (classAttributeValue: string, text: string) {
      return this.getTextInsideDivByClassAndNotDot(classAttributeValue, text, true, true);
    }

    static getAllTextBoxByClass(classAttribute: string, containsClass = false, insidePopup = false) {
      return element.all(By.xpath(TextBoxComponentSelectors.getTextBoxByClass(
        classAttribute, containsClass, insidePopup)));
    }

    static getTextBoxByClass (classAttribute: string, classIsContains = false, insidePopup = false) {
      return this.getAllTextBoxByClass(classAttribute, classIsContains, insidePopup).first();
    }

    static getTextBoxContainsClass (classAttribute: string) {
      return this.getTextBoxByClass(classAttribute, true);
    }

    static getAllTextBoxByClassAndPlaceholder (
      classAttribute: string, placeholder: string, containsClass = false,
      containsPlaceholder = false, insidePopup = false) {
        return element.all(By.xpath(TextBoxComponentSelectors.getTextBoxByClassAndPlaceholder(
          classAttribute, placeholder, containsClass, containsPlaceholder, insidePopup)));
    }

    static getTextBoxByClassAndPlaceholder (
      classAttribute: string, placeholder: string, containsClass = false,  containsPlaceholder = false, insidePopup = false) {
      return this.getAllTextBoxByClassAndPlaceholder(
        classAttribute, placeholder, containsClass, containsPlaceholder, insidePopup).first();
    }

    static getTextBoxContainsClassAndPlaceholder (classAttribute: string, placeholder: string) {
      return this.getTextBoxByClassAndPlaceholder(classAttribute, placeholder, true, true);
    }

    static getAllIconsByClass (classAttribute: string, containsClass = false, insidePopup = false) {
      return element.all(By.xpath(IconComponentSelectors.getIconByClass(
        classAttribute, containsClass, insidePopup)));
    }

    static getIconByClass (classAttribute: string, containsClass = false, insidePopup = false) {
      return this.getAllIconsByClass(classAttribute, containsClass, insidePopup).first();
    }

    static getIconContainsClass (classAttribute: string) {
      return this.getIconByClass(classAttribute, true);
    }

    static getAllIconsContainsClass (classAttribute: string) {
      return this.getAllIconsByClass(classAttribute, true);
    }

    static getAllTooltipForDivByClass (
      classAttribute: string, tooltipAttribute: string, containsClass = false, insidePopup = false) {
        return element.all(By.xpath(TextComponentSelectors.getTooltipForDivByClass(
          classAttribute, tooltipAttribute, containsClass, insidePopup)));
    }

    static getTooltipForDivByClass (
      classAttribute: string, tooltipAttribute: string, containsClass = false, insidePopup = false) {
        return this.getAllTooltipForDivByClass(
          classAttribute, tooltipAttribute, containsClass, insidePopup).first();
    }

    static getTooltipForDivContainsClass (classAttribute: string, tooltipAttribute: string) {
      return this.getTooltipForDivByClass(classAttribute, tooltipAttribute, true);
    }

    static getAllTextareaById(text: string, idIsContains = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getTextareaByIdXpath(text, idIsContains, insidePopup)));
    }

    static getTextareaById(text: string, idIsContains = false, insidePopup = false) {
      return this.getAllTextareaById(text, idIsContains, insidePopup).first();
    }

    static getTextareaContainsId(text: string) {
      return this.getTextareaById(text, true);
    }

    static getAllHeaderFiveByClass(text: string, classIsContains = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getHeaderFiveByClassXpath(text, classIsContains, insidePopup)));
    }

    static getHeaderFiveByClass(text: string, classIsContains = false, insidePopup = false) {
      return this.getAllHeaderFiveByClass(text, classIsContains, insidePopup).first();
    }

    static getHeaderFiveContainsClass(text: string) {
      return this.getHeaderFiveByClass(text, true);
    }

    static getAllCellById(text: string, idIsContains = false, insidePopup = false) {
      return element.all (By.xpath(GridComponentSelectors.getCellByClassXpath(text, idIsContains, insidePopup )));
    }

    static getCellById(text: string, idIsContains = false, insidePopup = false) {
      return this.getAllCellById(text, idIsContains, insidePopup ).first();
    }

    static getCellContainsId (text: string) {
      return this.getCellById(text, true);
    }

    static getAllButtonDisabled(text: string, isContains = false, insidePopup = false) {
      return element.all (By.xpath(ButtonComponentSelectors.getButtonDisabledXpath(text, isContains, insidePopup )));
    }

    static getButtonDisabled(text: string, isContains = false, insidePopup = false) {
      return this.getAllButtonDisabled(text, isContains, insidePopup ).first();
    }

    static getButtonContainsDisabled (text: string) {
      return this.getButtonDisabled(text, true);
    }

    static getAllParagraphsByText (paragraph: string, containsParagraprh = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getParagraphByTextXpath(
        paragraph, containsParagraprh, insidePopup)));
    }

    static getParagraphByText (paragraph: string, containsParagraprh = false, insidePopup = false) {
      return this.getAllParagraphsByText(paragraph, containsParagraprh, insidePopup).first();
    }

    static getParagraphContainsText (paragraph: string) {
      return this.getParagraphByText(paragraph, true);
    }

    static getAllTextBoxsInsideDivByClass (classAttributeValue: string, containsClass = false, insidePopup = false) {
      return element.all(By.xpath(TextBoxComponentSelectors.getTextBoxInsideDivByClass(
        classAttributeValue, containsClass, insidePopup)));
    }

    static getTextBoxInsideDivByClass (classAttributeValue: string, containsClass = false, insidePopup = false) {
      return this.getAllTextBoxsInsideDivByClass(classAttributeValue, containsClass, insidePopup).first();
    }

    static getTextBoxInsideDivContainsClass (classAttributeValue: string) {
      return this.getTextBoxInsideDivByClass(classAttributeValue, true);
    }

    static getAllTextsInsideDivAndListByClass (
      textValue: string, className: string, containsText = false, containsClass = false, insidePopup = false
    ) {
      return element.all(By.xpath(TextComponentSelectors.getTextInsideDivAndListByClassXpath(
        textValue, className, containsText, containsClass, insidePopup)));
    }

    static getTextInsideDivAndListByClass (
      textValue: string, className: string, containsText = false, containsClass = false, insidePopup = false
    ) {
      return this.getAllTextsInsideDivAndListByClass(textValue, className, containsText, containsClass, insidePopup).first();
    }

    static getTextContainsInsideDivAndListClass (textValue: string, className: string) {
      return this.getTextInsideDivAndListByClass(textValue, className, true, true);
    }

    static getAllDivsInsideListItemByNgRepeatAndClass (
      ngRepeatAttributeValue: string, classAttributeValue: string, containsNgRepeat = false, containsClass = false, insidePopup = false
    ) {
      return element.all(By.xpath(ListComponentSelectors.getDivInsideListItemByNgRepeatAndClassXpath(
        ngRepeatAttributeValue, classAttributeValue, containsNgRepeat, containsClass, insidePopup)));
    }

    static getDivInsideListItemByNgRepeatAndClass (
      ngRepeatAttributeValue: string, classAttributeValue: string, containsNgRepeat = false, containsClass = false, insidePopup = false
    ) {
      return this.getAllDivsInsideListItemByNgRepeatAndClass(
        ngRepeatAttributeValue, classAttributeValue, containsNgRepeat, containsClass, insidePopup).first();
    }

    static getDivContainsInsideListItemByNgRepeatAndClass (ngRepeatAttributeValue: string, classAttributeValue: string) {
      return this.getDivInsideListItemByNgRepeatAndClass(ngRepeatAttributeValue, classAttributeValue, true, true);
    }

    static getAllSpansByTextAndAreaExpanded (
      textValue: string, areaExpandedAttributeVal: string, containsText = false, containsAreaExpanded = false, insidePopup = false
    ) {
      return element.all(By.xpath(TextComponentSelectors.getSpanByTextAndAreaExpandedXpath(
        textValue, areaExpandedAttributeVal, containsText, containsAreaExpanded, insidePopup)));
    }

    static getSpanByTextAndAreaExpanded (
      textValue: string, areaExpandedAttributeVal: string, containsText = false, containsAreaExpanded = false, insidePopup = false
    ) {
      return this.getAllDivsInsideListItemByNgRepeatAndClass(
        textValue, areaExpandedAttributeVal, containsText, containsAreaExpanded, insidePopup).first();
    }

    static getSpanContainsTextAndAreaExpanded (textValue: string, areaExpandedAttributeVal: string) {
      return element(By.xpath(TextComponentSelectors.getSpanByTextAndAreaExpandedXpath(
        textValue, areaExpandedAttributeVal, true, true)));
    }

    static getAllTextsInsideDivAndIconByClass (
      textValue: string, className: string, containsText = false, containsClass = false, insidePopup = false) {
        return element.all(By.xpath(TextComponentSelectors.getTextInsideDivAndIconByClassXpath(
          textValue, className, containsText, containsClass, insidePopup)));
    }

    static getTextInsideDivAndIconByClass (
      textValue: string, className: string, containsText = false, containsClass = false, insidePopup = false) {
        return this.getAllTextsInsideDivAndIconByClass(textValue, className, containsText, containsClass, insidePopup). first();
    }

    static getTextInsideContainsDivAndIconByClass (textValue: string, className: string) {
      return this.getTextInsideDivAndIconByClass(textValue, className, true, true);
    }

    static getAllTextInsideContainsDivAndIconByClass (textValue: string, className: string) {
      return this.getAllTextsInsideDivAndIconByClass(textValue, className, true, true);
    }

    static getAllRowsByClass(text: string, containsClass = false, insidePopup = false) {
      return element.all (By.xpath(GridComponentSelectors.getRowByClassXpath(text, containsClass, insidePopup )));
    }

    static getRowByClass(text: string, containsClass = false, insidePopup = false) {
      return this.getAllRowsByClass(text, containsClass, insidePopup ).first();
    }

    static getRowContainsClass (text: string) {
      return this.getRowByClass(text, true);
    }

    static getAllDivsByClassInsideListByClass (
      listAttributeValue: string, divAttributeValue: string, classIsContains = false, insidePopup = false ) {
        return element.all (By.xpath(TextComponentSelectors.getDivByClassInsideListByClassXpath(listAttributeValue,
          divAttributeValue, classIsContains, insidePopup )));
    }

    static getDivByClassInsideListByClass (
      listAttributeValue: string, divAttributeValue: string , classIsContains = false, insidePopup = false) {
        return this.getAllDivsByClassInsideListByClass (listAttributeValue , divAttributeValue, classIsContains, insidePopup).first();
    }

    static getDivContainsClassInsideListContainsClass (listAttributeValue: string , divAttributeValue: string) {
      return this.getDivByClassInsideListByClass (listAttributeValue, divAttributeValue , true);
    }

    static getAllHeaderTextsInsideDivByClass(text: string, className: string, containsClass = false, insidePopup = false) {
      return element.all (By.xpath(TextComponentSelectors.getHeaderTextInsideDivByClassXpath(
        text, className, containsClass, insidePopup )));
    }

    static getHeaderTextsInsideDivByClass(text: string, className: string, containsClass = false, insidePopup = false) {
      return this.getAllHeaderTextsInsideDivByClass(text, className, containsClass, insidePopup ).first();
    }

    static getHeaderTextsInsideDivContainsClass (text: string, className: string) {
      return this.getHeaderTextsInsideDivByClass(text, className, true);
    }

    static getAllAnchorByNgHref(attributeValue: string, containsAttribute = false, insidePopup = false) {
      return element.all(By.xpath(TextComponentSelectors.getAnchorByNgHrefXpath(attributeValue, containsAttribute , insidePopup)));
    }

    static getAnchorByNgHref (attributeValue: string, containsAttribute = false, insidePopup = false) {
      return this.getAllAnchorByNgHref(attributeValue, containsAttribute, insidePopup ).first();
    }

    static getAnchorContainsNgHref (attributeValue: string) {
      return this.getAnchorByNgHref(attributeValue, true);
    }
}
