import { HtmlHelperFactory } from '@aurea/protractor-automation-helper';
import { HtmlHelper } from '../../../misc-utils/html-helper';
import { ComponentHelpers } from '../../component-helpers/component-helpers';
import { ModalComponentSelectors } from '../../../html/component-types/modal-component/modal-component-selectors';
import { LabelComponentSelectorsFactory} from '@aurea/protractor-automation-helper';

export class LabelComponentSelectors extends LabelComponentSelectorsFactory {

    public static getInputByLabelXpath(
        labelName: string,
        isContains = false,
        insidePopup = false
    ) {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                //${
                    HtmlHelperFactory.attributes.label
                }[${ComponentHelpers.getXPathFunctionForDot(
            labelName,
            isContains
        )}]//preceding::${HtmlHelper.tags.input}`;
    }

    public static getLabelByClassXpath(
        attributeValue: string,
        isContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
        //${
            HtmlHelperFactory.attributes.label
        }[${ComponentHelpers.getXPathFunctionForClass(
            attributeValue,
            isContains
        )}]`;
    }

    public static getLabelByNotClassXpath(
        classAttributeValue: string,
        classIsContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
        //${HtmlHelper.tags.label}[${ComponentHelpers.getXPathFunctionForNotClass(
            classAttributeValue,
            classIsContains
        )}]`;
    }

    public static getLabelByClassAndTextXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                ${ComponentHelpers.getXpathFunctionClassAndText(
                    HtmlHelper.tags.label,
                    classAttributeValue,
                    textAttributeValue,
                    classIsContains,
                    textIsContains
                )}`;
    }

    public static getLabelByNotClassAndTextXpath(
        classAttributeValue: string,
        textAttributeValue: string,
        classIsContains = false,
        textIsContains = false,
        insidePopup = false
    )   {
        return `${ModalComponentSelectors.getModelPopupXpath(insidePopup)}
                //${HtmlHelper.tags.label}[${ComponentHelpers.getXPathFunctionForNotClass(
                    classAttributeValue,
                    classIsContains
                )}][${ComponentHelpers.getXPathFunctionForText(
                    textAttributeValue,
                    textIsContains
                )}]`;
    }
}
