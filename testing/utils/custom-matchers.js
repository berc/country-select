/**
 * 2016, Rastislav Bertusek
 */

"use strict";

beforeEach(function () {
    jasmine.addMatchers({
        toBeAPromise: function () {
            return {
                compare: function (actual, expected) {
                    var result = {
                        pass: isFunction(actual.then)
                    };

                    if (result.pass) {
                        result.message = "Expected element " + actual + " NOT to be a promise (promises have a 'then' function)"
                    } else {
                        result.message = "Expected element " + actual + "to be a promise (promises have a 'then' function)"
                    }
                    return result;
                }
            };
        },

        toHaveBeenCalledOnce: function () {
            return {
                compare: function (actual, expected) {
                    if (!jasmine.isSpy(actual)) {
                        throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
                    }

                    var callCount = actual.calls.count();
                    var result = {
                        pass: callCount === 1
                    };

                    if (result.pass) {
                        result.message = "Expected " + actual.and.identity() + " NOT to have been called once but it was called " + callCount;
                    } else {
                        result.message = "Expected " + actual.and.identity() + " to have been called once but it was called " + callCount;
                    }

                    return result;
                }
            };
        }
    });
});
