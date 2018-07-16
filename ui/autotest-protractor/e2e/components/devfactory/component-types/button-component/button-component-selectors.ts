import {ButtonComponentSelectorsFactory,
        ModelComponentSelectorsFactory,
        ComponentHelpersFactory} from '@aurea/protractor-automation-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {BaseComponentHelper} from '../../../html/component-helpers/base-component-helper';

export class ButtonComponentSelectors extends ButtonComponentSelectorsFactory {
    public static getButtonByTextXpath(
        text: string,
        isContains = false,
        insidePopup = false
    )   {
        return `${ModelComponentSelectorsFactory.getModelPopupXpath(insidePopup)}
                //${
                  this.selectorTag
                }[${ComponentHelpersFactory.getXPathFunctionForDot(
          text,
          isContains
        )}]`;
    }

    public static getButtonDisabledXpath(
    disableAttributeValue: string,
    isContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getSpecificTagByDisabledAttributeXpath(
      HtmlHelper.tags.button,
      disableAttributeValue,
      isContains, insidePopup
    );
  }

  public static getButtonByIdXpath(
    idAttributeValue: string,
    isContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getIdXpath(
      HtmlHelper.tags.button,
      idAttributeValue,
      isContains, insidePopup
    );
  }

}
