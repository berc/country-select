import _ from 'lodash';

const MIN_TEXT_LENGTH = 2;

class editableSelectController {
  constructor($scope, $timeout) {
    this.$scope = $scope;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.dropdownElem = $('.dropdown-menu');
    this.inputElem = $('.editable-select__input');
    this.resetInputText();
    this.isValid = true;
    this.isDisabled = false;
    this.watchOptions();
    this.setupOnChangedThrottled();
  }

  $onDestroy() {
    this.unwatch();
  }

  watchOptions() {
    this.unwatch = this.$scope.$watch('selectOptions', (newValue) => {
      this.$scope.$applyAsync(() =>
        ((newValue && newValue.length) > 0 ? this.dropdownElem.show(): this.dropdownElem.hide())
      );
    });
  }

  setupOnChangedThrottled() {
    this.onChangedThrottled = _.throttle(
      (value) => this.$scope.$applyAsync(() => this.$scope.onChangedText(value)),
      500);
  }

  onChanged(value) {
    if (!value || (value && value.length >= MIN_TEXT_LENGTH)) {
      this.onChangedThrottled({value});
    }
  }

  onSelected(option) {
    this.resetInputText();
    this.$scope.onSelectedOption({ option });
  }

  resetInputText() {
    this.inputText = '';
  }

  // checkValidity() {
  //   if (!this.inputText.match(this.inputElem.attr('pattern'))) {
  //     this.inputElem[0].setCustomValidity('Invalid text. Use only alphabetical characters.');
  //     return false;
  //   }
  //   this.inputElem[0].setCustomValidity('');
  //   return true;
  // }
}

export default ['$scope', '$timeout', editableSelectController];
