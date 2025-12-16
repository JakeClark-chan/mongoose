'use strict';
require('./sdk-tester.module');

angular
    .module('kcSdk.Tester')
    .factory('sdkTesterSignInService', sdkTesterSignInService);

sdkTesterSignInService.$inject = ['$rootScope'];

function sdkTesterSignInService($rootScope) {
    var serverErrorMessageModel = {
        id: 'ServerError',
        messageType: 'error',
        content: '',
        visible: false
    };

    var clientErrorMessageModel = {
        id: 'ClientError',
        messageType: 'error',
        content: 'Review the form and correct highlighted fields.',
        visible: false
    };

    var busy = false;
    var advancedMode = false;
    var serverError = serverErrorMessageModel;
    var clientError = clientErrorMessageModel;
    var userName = '';
    var organization = 'Hartford HealthCare';

    var service = {
        busy: busy,
        serverError: serverError,
        clientError: clientError,
        userName: userName,
        organization: organization,
        advancedMode: advancedMode,
        clearClientError: clearClientError,
       
        signInButtonText: advancedMode ? 'Generate Token' : 'Launch Encoder',
        signInHeaderText: advancedMode ? 'Create Token' : 'Enter Info',
    }

    function clearClientError() {
        service.serverError.visible = false;
        service.clientError.visible = false;
        service.signInForm.$setPristine();
    }

    return service;
}
