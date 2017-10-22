/**
 * 2016, Rastislav Bertusek
 */

"use strict";

var injector = angular.injector(['ng']);
var $sniffer = injector.get('$sniffer');

function decorateSpyWithPromiseResult($q, jasmineSpy) {
    var defer = $q.defer();
    jasmineSpy.defer = defer;
    jasmineSpy.and.returnValue(defer.promise);
}


function changeInputValue(input, value) {
    input = angular.element(input);
    input.val(value);
    input.trigger($sniffer.hasEvent('input') ? 'input' : 'change'); // we trigger this event so that angular knows that the input has changed.
    input.trigger('keydown'); // we trigger this event so that angular knows that the input has changed.
}


function selectOption(select, optionValue){
    select.val(optionValue).change();
}

function mousedownEvent(target) {
    return mouseEvent('mousedown', target);
}

function mouseEvent(type, target) {
    var e = jQuery.Event(type);
    e.target = target;
    return e;
}

function clickEvent(target) {
    var e = jQuery.Event('click');
    e.target = target;
    return e;
}
