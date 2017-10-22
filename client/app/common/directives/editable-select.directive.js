import template from './editable-select.html';
import controller from './editable-select.controller';
import './editable-select.scss';

let editableSelect = function () {
    return {
        restrict: 'E',
        scope: {
          other: '<',
          selectOptions: '<',
          onSelectedOption: '&',
          onChangedText: '&'
        },
        template,
        controller,
        controllerAs: '$ctrl'
    }
};

export default editableSelect;
