import {GridComponentSelectorsFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';

export class GridComponentSelectors extends GridComponentSelectorsFactory {

  public static getCellById(
    idAttributeValue: string,
    isContains = false

  ) {
    return BaseComponentHelper.getIdXpath(
      HtmlHelper.tags.td,
      idAttributeValue,
      isContains
    );
  }

  public static getCellByClassXpath(
    classAttributeValue: string,
    classIsContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getClassXpath(
      HtmlHelper.tags.td,
      classAttributeValue,
      classIsContains, insidePopup
    );
  }

  public static getRowByClassXpath(
    classAttributeValue: string,
    classIsContains = false,
    insidePopup = false
  ) {
    return BaseComponentHelper.getClassXpath(
      HtmlHelper.tags.tr,
      classAttributeValue,
      classIsContains, insidePopup
    );
  }
}
