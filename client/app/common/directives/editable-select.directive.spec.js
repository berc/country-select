import CommonModule from '../common.module';

describe('editableSelect directive', () => {
  let $rootScope, $timeout, $compile;

  beforeEach(window.module(CommonModule));

  beforeEach(inject((_$rootScope_, _$timeout_, _$compile_) => {
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $compile = _$compile_;
  }));

  let scope, template, ctrl;

  const REDUSED_COUNTRIES_LIST = [{ id: 'AUT', label: 'Austria' },
    { id: 'ARG', label: 'Argentina' }];
  const COUNTRIES_LIST = [...REDUSED_COUNTRIES_LIST,
    { id: 'AUS', label: 'Australia' }];
  const SELECTED_COUNTRY = { id: 'AUS', label: 'Australia' };
  const SEARCH_TEXT = 'testsearch';

  beforeEach(() => {
    // Arrange
    scope = $rootScope.$new();
    scope.onChangedText = jasmine.createSpy('onChangedText');
    scope.onSelectedOption = jasmine.createSpy('onSelectedOption');
    scope.initialValue = [];
    template = $compile('<editable-select on-selected-option="onSelectedOption(option)" on-changed-text="onChangedText(value)" select-options="initialValue"></editable-select>')(scope);
    ctrl = template.controller('editableSelect');
  });

  describe('initialisation', () => {
    it('has compiled template', () => {
      // Act
      scope.$digest();

      // Assert
      expect($(template).find('.editable-select').html()).toBeDefined();
      expect($(template).find('.editable-select__option--hover').length).toEqual(0);
    });

    it('has connected controller properties', () => {
      // Arrange
      scope.initialValue = COUNTRIES_LIST;

      // Act
      scope.$digest();

      // Assert
      expect($(template).find('.editable-select__option--hover').length).toEqual(3);
    });
  });

  describe('call onChanged function', () => {
    // Arrange
    beforeEach(() => {
      spyOn(_, 'throttle').and.callFake((fn) => ( () => { $timeout(fn); } ) );
    });

    it('fires event onChangedText to parent', () => {
      // Act
      ctrl.onChanged(SEARCH_TEXT);
      $timeout.flush();
      scope.$digest();

      // Assert
      expect(scope.onChangedText).toHaveBeenCalledOnce();
      expect(scope.onChangedText).toHaveBeenCalledWith(SEARCH_TEXT);
    });
  });

  describe('call onChanged function', () => {
    // Arrange
    beforeEach(() => {
      spyOn(_, 'throttle').and.callFake((fn) => ( () => { $timeout(fn); } ) );
    });

    it('not fires event onChangedText for 1 length string', () => {
      // Act
      ctrl.onChanged('a');
      $timeout.flush();
      scope.$digest();

      // Assert
      expect(scope.onChangedText).not.toHaveBeenCalled();
    });
  });

  describe('call onSelected function', () => {
    it('fires event onSelectedOption to parent', () => {
      scope.initialValue = COUNTRIES_LIST;
      ctrl.inputText = SEARCH_TEXT;

      // Act
      ctrl.onSelected(SELECTED_COUNTRY);
      scope.$digest();

      // Assert
      expect(ctrl.inputText).toEqual('');
      expect(scope.onSelectedOption).toHaveBeenCalledOnce();
      expect(scope.onSelectedOption).toHaveBeenCalledWith(SELECTED_COUNTRY);
    });
  });
});
