import {HtmlHelperFactory} from '@aurea/protractor-automation-helper';

export class HtmlHelper extends HtmlHelperFactory {
    public static get attributeValues() {
        return {
            alertDanger: 'alert-danger',
            uibTooltip: 'uib-tooltip',
            ngBinding: 'ng-binding',
            widgetContent: 'widget-content',
            disabled: 'disabled',
            dialog: 'dialog',
            highchartsContainer: 'highcharts-container',
            selectedFilter: 'selected-filter',
            details: 'details',
            categoryName: 'category-name',
            tooltip: 'tooltip-inner',
            detailsCentre: 'details t-a-center',
            decrementMinutes: 'decrement minutes',
            ngRepeat: 'ng-repeat',
            ariaExpanded: 'aria-expanded',
            activityName : 'activity-name',
            screenshotHolder : 'screenshot-holder',
            approximation : 'approximation',
            activityItem : 'activity-item',
            slider : 'rzslider',
            nghref : 'ng-href',
        };
    }
    public static get tags() {
        return{
          span: 'span',
          div: 'div',
          h5: 'h5',
          h6: 'h6',
          input: 'input',
          label: 'label',
          listItem: 'li',
          icon: 'i',
          button: 'button',
          td: 'td',
          tr: 'tr',
          textarea: 'textarea',
          anchor: 'a',
          paragraph: 'p'
        };
    }
}
