'use strict';
require('./sdk-tester.module');

angular
    .module('kcSdk.Tester')
    .factory('sdkStringService', sdkStringService);

function sdkStringService() {
    function wrapAsArray(str) {
        if (str.charAt(0) !== '[') {
            str = '[' + str;
        }

        if (str.charAt(str.length) !== ']') {
            str = str + ']';
        }

        return str;
    }

    function removeBrackets(str) {
        if (str.charAt(0) === '[') {
            str = str.substring(1);
        }

        if (str.charAt(str.length - 1) === ']') {
            str = str.substring(0, str.length - 1);
        }
        return str;
    }

    function isJson(str) {
        try {
            return (JSON.parse(str) && str);
        } catch (e) {
            return false;
        }
    }

    function getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        return today = mm + '/' + dd + '/' + yyyy;
    }

    function getBirthDateISO() {
        var bd = new Date();
        bd.setFullYear(bd.getFullYear() - 30);
        return bd.toISOString();
    }

    function getCurrentDateISO() {
        return new Date().toISOString();
    }

    var service = {
        wrapAsArray: wrapAsArray,
        removeBrackets: removeBrackets,
        isJson: isJson,
        getCurrentDate: getCurrentDate,
        getBirthDateISO: getBirthDateISO,
        getCurrentDateISO: getCurrentDateISO
    }

    return service;
}
