'use strict';

require('./kc-sdk');
require('./kc-sdk-config');
require('./sdk-tester.module');
require('./sdk-tester-signin.service');

angular.module('kcSdk.Tester').controller('testerController', testerController);
testerController.$inject = ['$scope', '$timeout', '$http', '$q',
    'sdkStringService', 'sdkTesterSignInService'];

function testerController($scope, $timeout, $http, $q,
    sdkStringService, sdkTesterSignInService) {
    var kcSdk = window.kcSdk;
    // to test client specific tokens you need
    // 1. their token
    // 2. their cer key
    // 3. updated appesttings for issuer, audience and cert path
    var clientExampleToken = '';

    var vm = this;
    var WEB_KC = "web/KC.html";
    var WEB_ENCODER = "web/Encoder.html";
    vm.selectedPod = '';
    vm.outputJson = '';
    vm.sdkKcIsListening = false;
    vm.sdkEncoderIsListening = false;
    vm.sdkTesterSignInService = sdkTesterSignInService;
    vm.signInButtonText = sdkTesterSignInService.advancedMode ? 'Generate Token' : 'Launch Encoder';
    vm.version = kcSdk.version;

    vm.clearInputOutput = function () {
        vm.outputJson = '';
        vm.clearWorkflow();
        vm.sdkTesterSignInService.clearClientError();
    };

    vm.clearOutput = function () {
        vm.outputJson = '';
    }

    vm.exampleAuthToken = {
        userName: 'test2021',
        organizationName: '',
        access_token: ''
    };

    vm.examplePatientRecord = {
        demoPatientData: {
            sendingFacility: "001",
        },
        i9Case: {
            admitDiagnosisCodes: [],
            diagnosisCodes: [],
            procedureCodes: []
        },
        i10Case: {
            admitDiagnosisCodes: [],
            diagnosisCodes: [],
            procedureCodes: []
        },
        hcpcsCodes: [],
        chargeCodes: [],
        otherInfo: {
            "isDefaultCase": false
        }
    }

    vm.exampleUrl = 'http://www.google.com';

    vm.exampleDemographicsData = {
        sex: 'M',
        sendingFacility: "001",
        birthDate: sdkStringService.getBirthDateISO(),
        admitDate: sdkStringService.getCurrentDateISO(),
        dischargeDate: sdkStringService.getCurrentDateISO(),
        patientType: kcSdk.patientType.INPATIENT,
        financialClass: "09"
    };

    vm.encoderDemographics = angular.toJson(vm.exampleDemographicsData, 2);

    vm.encoderTabs = [
        kcSdk.encoderTabs.LOGIC,
        kcSdk.encoderTabs.INDEX,
        kcSdk.encoderTabs.TABULAR
    ]

    vm.selectedEncoderTab = kcSdk.encoderTabs.LOGIC;

    vm.sessionTypes = [];

    vm.selectedSessionType = vm.sessionTypes[0];

    vm.patientTypes = [
        kcSdk.patientType.INPATIENT,
        kcSdk.patientType.OUTPATIENT,
        kcSdk.patientType.IRF,
        kcSdk.patientType.SNF
    ];

    vm.selectedPatientType = vm.patientTypes[0]

    vm.i9I10States = kcSdk.i9I10States;
    vm.selectedI9I10State = vm.i9I10States.I10;

    vm.encoderPhraseCode = '';

    vm.closeAllKCWindows = kcSdk.closeAllKCWindows;

    vm.kcWindowDataChanged = function (data) {
        $scope.$apply(function () {
            logOutput(data.callback, data.value);
        });
    };

    vm.encoderWindowDataChanged = function (data) {
        $scope.$apply(function () {
            logOutput(data.callback, data.value);
        });
    };

    vm.kcListeningChanged = function (data) {
        $scope.$apply(function () {
            vm.sdkKcIsListening = kcSdk.kcWindowIsListening;
            logOutput(data.callback, kcSdk.kcWindowIsListening);
        });
    };

    vm.encoderListeningChanged = function (data) {
        $scope.$apply(function () {
            vm.sdkEncoderIsListening = kcSdk.encoderWindowIsListening;
            logOutput(data.callback, kcSdk.encoderWindowIsListening);
        });
    };

    vm.workflowComplete = function () {
        $timeout(function () {
            vm.availableApiSelected = vm.availableApis[0];
            vm.onSelectedNewWorkflowApiChange();
        });
    }

    vm.doSigninSubmit = function () {
        if (!vm.sdkTesterSignInService.signInForm.$valid) {
            vm.sdkTesterSignInService.serverError.visible = false;
            vm.sdkTesterSignInService.clientError.visible = true;
            vm.sdkTesterSignInService.signInForm.$setPristine();

            return;
        }

        if (vm.sdkTesterSignInService.advancedMode) {
            vm.generateToken();
        }
        else {


            var encoderRequest = {
                sessionType: vm.selectedSessionType,
                encoderTab: vm.selectedEncoderTab,
                codePhrase: vm.encoderPhraseCode
            }
            var authData = {
                grant_type: 'org_login',
                username: vm.sdkTesterSignInService.clientInfo.name,
                organizationId: vm.sdkTesterSignInService.organization,
                enableEncoder: true,
                client_id: kcSdkConfig.appName,
                client_secret: kcSdkConfig.secret
            }

            vm.setAuthToken(authData).then(function () {
                vm.launchEncoder(encoderRequest);
            });
        }
        vm.sdkTesterSignInService.clearClientError();
    }

    vm.generateToken = function () {
        if (vm.sdkTesterSignInService.signInForm.$valid) {
            var authData = {
                grant_type: 'org_login',
                username: vm.sdkTesterSignInService.clientInfo.name,
                organizationId: vm.sdkTesterSignInService.organization,
                enableEncoder: true,
                client_id: kcSdkConfig.appName,
                client_secret: kcSdkConfig.secret
            }
            vm.setAuthToken(authData);
        }
        else {
            vm.sdkTesterSignInService.serverError.visible = false;
            vm.sdkTesterSignInService.clientError.content = "Review the form and correct highlighted fields."
            vm.sdkTesterSignInService.clientError.visible = true;
            vm.sdkTesterSignInService.signInForm.$setPristine();
        }
    }

    vm.setAuthToken = function (authData) {

        var authOrgUser = {
            username: btoa(authData.username),
            organization: authData.organizationId,
            clientId: kcSdkConfig.appName
        };

        var headers = { 'Content-Type': 'application/json' };

        return $http({
            method: "POST",
            url: kcSdkConfig.tokenServer + 'orgLogin',
            headers: headers,
            data: authOrgUser
        }).then(function (response) {
            if (response && response.data) {
                vm.exampleAuthToken.access_token = response.data.token;
                logOutput('auth', 'token generated - userName:\'' + authData.username + '\' org: \'' + authData.organizationId + '\'');
            }
        }, function (response) {
            if (response.status === 401) {
                vm.exampleAuthToken.access_token = '';

                vm.sdkTesterSignInService.serverError.visible = false;
                vm.sdkTesterSignInService.clientError.content = 'Failed to authenticate user.'
                vm.sdkTesterSignInService.clientError.visible = true;
                vm.sdkTesterSignInService.signInForm.$setPristine();

            }
            var description = response.data && response.data.message
                ? response.data.message
                : 'undefined error message';
            logOutput('auth', 'token exception: ' + description);
            return $q.reject();
        });
    }

    vm.advancedModeOnChange = function () {
        vm.sdkTesterSignInService.signInButtonText = vm.sdkTesterSignInService.advancedMode ? 'Generate Token' : 'Launch Encoder';
        vm.sdkTesterSignInService.signInHeaderText = vm.sdkTesterSignInService.advancedMode ? 'Create Token' : 'Enter Info';
        vm.sdkTesterSignInService.clearClientError();
        vm.clearInputOutput();

        if (vm.sdkTesterSignInService.advancedMode) {
            vm.onSelectedNewWorkflowApiChange();
        }
    };

    vm.workflow = kcSdk.workflow;
    vm.clearWorkflow = function () {
        kcSdk.clearWorkflow();
        vm.availableApiSelected = vm.availableApis[0];
        vm.onSelectedNewWorkflowApiChange();
    };
    vm.selectedWorkflowApi = _.first(kcSdk.workflow);
    vm.workflowInput = kcSdkConfig.url + WEB_KC;
    vm.kcWindowName = kcSdk.kcWindow.name;
    vm.encoderWindowName = kcSdk.encoderWindow.name;
    var apisForAllWindows = [
        {
            name: 'launch',
            fn: kcSdk.kcWindow.launch,
            windowName: vm.kcWindowName
        },
        {
            name: 'launch',
            fn: kcSdk.encoderWindow.launch,
            windowName: vm.encoderWindowName
        },
        {
            name: 'loadPatientRecord',
            fn: kcSdk.kcWindow.loadPatientRecord,
            windowName: vm.kcWindowName
        },
        {
            name: 'assignConfig',
            fn: kcSdk.kcWindow.assignConfig,
            windowName: vm.kcWindowName
        },
        {
            name: 'setAuthToken',
            fn: kcSdk.kcWindow.setAuthToken,
            windowName: vm.kcWindowName
        },
        {
            name: 'setDemographics',
            fn: kcSdk.kcWindow.setDemographics,
            windowName: vm.kcWindowName
        },
        {
            name: 'setAuthToken',
            fn: kcSdk.encoderWindow.setAuthToken,
            windowName: vm.encoderWindowName
        },
        {
            name: 'setDemographics',
            fn: kcSdk.encoderWindow.setDemographics,
            windowName: vm.encoderWindowName
        }]

    vm.availableApis = _.cloneDeep(apisForAllWindows);

    vm.availableApiSelected = vm.availableApis[0];
    vm.workflowWindow = vm.kcWindowName;
    vm.workflowWindowChanged = function (selectedWindow) {
        vm.availableApis.length = 0;
        kcSdk.clearWorkflow();
        apisForAllWindows.forEach(function (a) {
            if (a.windowName === selectedWindow) {
                vm.availableApis.push(a);
            }
        })
        vm.availableApiSelected = vm.availableApis[0];
        vm.onSelectedNewWorkflowApiChange();
    }

    vm.addApi = function () {
        var args = vm.workflowInput ?
            sdkStringService.isJson(vm.workflowInput) ? JSON.parse(vm.workflowInput) : vm.workflowInput :
            [];

        kcSdk.addToWorkflow({
            fn: vm.availableApiSelected.fn,
            args: args
        });
        vm.selectedWorkflowApi = _.last(kcSdk.workflow);
    }

    vm.updateApi = function () {
        var selectedWf = kcSdk.workflow[document.getElementById("kc-workflow").selectedIndex];
        if (selectedWf) {
            selectedWf.args = JSON.parse(vm.workflowInput);
        }
    }

    vm.removeApi = function () {
        kcSdk.removeFromWorkflow([document.getElementById("kc-workflow").selectedIndex]);
        vm.selectedWorkflowApi = _.first(kcSdk.workflow);
    }

    vm.runWorkflow = kcSdk.processWorkflow;
    vm.onSelectedWorkflowApiChange = function () {
        var selectedWf = kcSdk.workflow[document.getElementById("kc-workflow").selectedIndex];
        if (selectedWf) {
            vm.workflowInput = angular.toJson(selectedWf.args, 2);
        }
    }
    vm.onSelectedNewWorkflowApiChange = function () {
        if (clientExampleToken) {
            vm.exampleAuthToken.access_token = clientExampleToken;
        }

        switch (vm.availableApiSelected.name) {
            case 'loadPatientRecord':
                vm.workflowInput = angular.toJson(vm.examplePatientRecord, 2);
                break;
            case 'assignConfig':
                vm.workflowInput = angular.toJson({ rcpEndpointUri: vm.exampleUrl }, 2);
                break;
            case 'setAuthToken':
                vm.workflowInput = angular.toJson(vm.exampleAuthToken, 2);
                break;
            case 'setDemographics':
                vm.workflowInput = angular.toJson(vm.exampleDemographicsData, 2);
                break;
            case 'launch':


                if (vm.workflowWindow === vm.kcWindowName) {
                    var url = kcSdkConfig.url + WEB_KC;
                    var state = vm.selectedI9I10State;

                    var args = [angular.toJson(url, 2), angular.toJson(vm.exampleAuthToken, 2), angular.toJson(state, 2), angular.toJson(vm.exampleDemographicsData, 2)].join(',\n');
                    vm.workflowInput = sdkStringService.wrapAsArray(args);
                }
                else {
                    var url = kcSdkConfig.url + WEB_ENCODER;
                    var demographics = vm.exampleDemographicsData;
                    var encoderRequest = {
                        sessionType: kcSdk.sessionTypes.I10CM,
                        encoderTab: kcSdk.encoderTabs.LOGIC,
                        codePhrase: 'ANGINA'
                    }
                    var state = vm.selectedI9I10State;

                    var args = [angular.toJson(url, 2), angular.toJson(vm.exampleAuthToken, 2), angular.toJson(state, 2), angular.toJson(demographics, 2), angular.toJson(encoderRequest, 2)].join(',\n');

                    vm.workflowInput = sdkStringService.wrapAsArray(args);
                }

                break;
            default:
                vm.workflowInput = undefined;
        }
    }

    vm.onStateChange = function () {
        filterSessionTypes(vm.selectedI9I10State);
    }

    vm.onPatientTypeChange = function () {
        try {
            var demo = JSON.parse(vm.encoderDemographics);
            demo.patientType = vm.selectedPatientType;
            vm.encoderDemographics = angular.toJson(demo, 2);
        }
        catch (e) {
            vm.exampleDemographicsData.patientType = vm.selectedPatientType;
            vm.encoderDemographics = angular.toJson(vm.exampleDemographicsData, 2);
        }
    }

    vm.exportWorkflow = function () {
        var xwf = [];
        xwf.push({
            name: 'workflowWindow',
            args: vm.workflowWindow
        })
        kcSdk.workflow.forEach(function (w) {
            xwf.push({
                name: w.name.indexOf('launch') === 0 ? 'launch' : w.name,
                args: w.args
            })
        });
        logOutput('workflow export', xwf);
    }

    vm.importWorkflow = function () {
        try {
            var iwf = JSON.parse(vm.workflowInput);
            var input = _.find(iwf, { 'event': 'workflow export' });
            var wfWindow = _.find(input.response, { 'name': 'workflowWindow' });
            _.pull(input.response, _.find(input.response, { 'name': 'workflowWindow' }));
            vm.workflowWindow = wfWindow.args;

            if (!input.response) {
                logOutput('workflow import', 'workflow import not expected format');
                return;
            }

            kcSdk.clearWorkflow();
            input.response.forEach(function (w) {
                var a = _.find(apisForAllWindows, { name: w.name, windowName: vm.workflowWindow })
                kcSdk.addToWorkflow({
                    fn: a.fn,
                    args: w.args
                });
            })
            vm.workflowInput = '';
        }
        catch (e) {
            logOutput('workflow import', 'workflow import exception: ' + e);
        }
    }

    vm.launchKc = function () {

        if (!vm.sdkTesterSignInService.signInForm.$valid) {
            vm.sdkTesterSignInService.serverError.visible = false;
            vm.sdkTesterSignInService.clientError.visible = true;
            vm.sdkTesterSignInService.signInForm.$setPristine();

            return;
        }
        vm.sdkTesterSignInService.clearClientError();

        var authData = {
            grant_type: 'org_login',
            username: vm.sdkTesterSignInService.clientInfo.name,
            organizationId: vm.sdkTesterSignInService.organization,
            enableEncoder: true,
            client_id: kcSdkConfig.appName,
            client_secret: kcSdkConfig.secret
        }

        vm.setAuthToken(authData).then(function () {
            var url = kcSdkConfig.url + WEB_KC;
            var demographics = vm.encoderDemographics;
            var state = vm.selectedI9I10State;

            if (clientExampleToken) {
                vm.exampleAuthToken.access_token = clientExampleToken;
            }

            kcSdk.kcWindow.launch(url, vm.exampleAuthToken, state, demographics);
        });

    }

    vm.launchReferences = function () {
        if (!vm.sdkTesterSignInService.signInForm.$valid) {
            vm.sdkTesterSignInService.serverError.visible = false;
            vm.sdkTesterSignInService.clientError.visible = true;
            vm.sdkTesterSignInService.signInForm.$setPristine();

            return;
        }
        vm.sdkTesterSignInService.clearClientError();
        var authData = {
            grant_type: 'org_login',
            username: vm.sdkTesterSignInService.clientInfo.name,
            organizationId: vm.sdkTesterSignInService.organization,
            enableEncoder: true,
            client_id: kcSdkConfig.appName,
            client_secret: kcSdkConfig.secret
        }

        vm.setAuthToken(authData).then(function () {
            kcSdk.launchReferences(vm.encoderPhraseCode, vm.selectedSessionType.name, vm.exampleAuthToken.access_token);
        });
    }

    vm.launchEncoder = function (encoderRequest) {
        var url = kcSdkConfig.url + WEB_ENCODER;
        var demographics = vm.encoderDemographics;
        var state = vm.selectedI9I10State;
        if (clientExampleToken) {
            vm.exampleAuthToken.access_token = clientExampleToken;
        }


        kcSdk.encoderWindow.launch(url, vm.exampleAuthToken, state, demographics, encoderRequest);
    };



    function logOutput(event, message) {
        var jsonOutput = {
            event: event,
            response: sdkStringService.isJson(message) ? JSON.parse(message) : message
        }

        if (jsonOutput.event === 'editGroupPriceCompleted') {
            jsonOutput.response = [];
        }

        vm.outputJson = vm.outputJson ? [sdkStringService.removeBrackets(vm.outputJson), angular.toJson(jsonOutput, 2)].join(',\n') : angular.toJson(jsonOutput, 2);

        vm.outputJson = sdkStringService.wrapAsArray(vm.outputJson);
    }

    function filterSessionTypes(state) {
        vm.sessionTypes.length = 0;
        for (var session in kcSdk.sessionTypes) {
            var s = kcSdk.sessionTypes[session];
            if (s.state.indexOf(state.value) > -1) {
                vm.sessionTypes.push(s);
            }
        }

        vm.selectedSessionType = vm.sessionTypes[0];
    }

    activate();

    function activate() {
        kcSdk.setCallback(kcSdk.callbacks.SDKEXCEPTION, vm.kcWindowDataChanged);
        kcSdk.setCallback(kcSdk.callbacks.WORKFLOWCOMPLETE, vm.workflowComplete);

        kcSdk.setCallback(kcSdk.callbacks.SDKRESPONSE, vm.kcWindowDataChanged);
        kcSdk.setCallback(kcSdk.callbacks.KCLISTENINGCHANGED, vm.kcListeningChanged);
        kcSdk.setCallback(kcSdk.callbacks.ENCODERLISTENINGCHANGED, vm.encoderListeningChanged);
        kcSdk.clearWorkflow();

        var authData = {
            grant_type: 'org_login',
            username: 'sdkTester',
            organizationId: 'Justice League',
            enableEncoder: true,
            client_id: kcSdkConfig.appName,
            client_secret: kcSdkConfig.secret
        }
        filterSessionTypes(vm.selectedI9I10State);

        vm.setAuthToken(authData);
        vm.workflowWindowChanged(vm.kcWindowName);

    }

    function xform(obj) {
        var str = [];
        for (var p in obj) {
            /* istanbul ignore else*/
            // this check is done because of IE
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    };
}