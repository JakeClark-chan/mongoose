"use strict";

var kcSdkVersion = "6.1.5863"

var kcSdk = function kcSdk() {
    // locals
    var communicationPacket = {
        sender: 'kcSdk',
        windowName: '',
        action: '',
        value: null
    };
    var workflow = [];
    var callbackFns = [];

    var responseTime;
    var timeoutThresholdSeconds = 30;

    // window locals
    var kcWindowName = 'kc-sdk-launched-instance';
    var kcWindowParams = [
        'height=' + screen.height,
        'width=' + screen.width,
        'location=0',
        'top=10',
        'left=10'].join(',');


    var encoderWindowName = 'encoder-sdk-launched-instance';
    var encoderWindowParams = "resizable=1,scrollbars=0,location=0,menubar=0,toolbar=0,top=10,left=10,width=950,height=500";

    var kcWindow = {
        reference: null,
        opened: false,
        name: kcWindowName,
        currentWorkflow: {},
        responseTime: responseTime,
        launch: launchKc,
        loadPatientRecord: loadPatientRecord,
        assignConfig: assignConfig,
        setAuthToken: setAuthToken,
        setI9I10State: setI9I10State,
        setDemographics: setDemographics,
        authTokenData: {}
    };

    var encoderWindow = {
        reference: null,
        name: encoderWindowName,
        opened: false,
        currentWorkflow: {},
        responseTime: responseTime,
        launch: launchEncoder,
        setAuthToken: setAuthToken,
        setI9I10State: setI9I10State,
        setDemographics: setDemographics,
        authTokenData: {}
    };

    // service
    var service = {
        encoderTabs: encoderTabs,
        sessionTypes: sessionTypes,
        patientType: patientType,
        i9I10States: i9I10States,
        listenerResponse: listenerResponse,
        kcWindow: kcWindow,
        encoderWindow: encoderWindow,
        closeAllKCWindows: closeAllKCWindows,
        kcWindowIsListening: false,
        encoderWindowIsListening: false,
        launchReferences: kcMreService.launchMre,
        setCallback: setCallback,
        callbacks: callbacks,
        workflow: workflow,
        addToWorkflow: addToWorkflow,
        removeFromWorkflow: removeFromWorkflow,
        processWorkflow: processWorkflow,
        clearWorkflow: clearWorkflow,
        workflowComplete: true,
        listenerException: false,
        version: kcSdkVersion
    };

    // listener for opened window messages
    window.addEventListener('message', function (e) {

        if (event.data.callback === "kcRefreshed" && service.kcWindow.reference) {
            service.kcWindow.opened = true;
            service.kcWindowIsListening = true;
        }
        else if (event.data.callback === "encoderRefreshed" && service.encoderWindow.reference) {
            service.encoderWindow.opened = true;
            service.encoderWindowIsListening = true;
        }

        if (!(service.kcWindow.reference && event.data.sender === "kcWindow") &&
            !(service.encoderWindow.reference && event.data.sender === "encoderWindow")) {
            return;
        }

        var needsAuthentication = false;
        var callback = event.data.callback;

        switch (event.data.action) {
            case 'sdkServiceResponse':
                if (event.data.sender === "kcWindow") {
                    if (event.data.callback === "kcListeningChanged") {
                        service.kcWindowIsListening = service.listenerResponse.OPENKC === event.data.value;
                        if (service.kcWindowIsListening) {
                            needsAuthentication = service.workflow.length === 0 || service.workflow.length > 0 && service.workflow[0].name !== 'setAuthToken';
                        }
                        else {
                            closeKcWindow();
                        }
                    }
                    else if (event.data.callback === 'kcRefreshed') {
                        callback = 'sdkServiceResponse';
                        clearWorkflow();
                    }
                    else {
                        callback = 'sdkServiceResponse';
                    }
                }
                else if (event.data.sender === "encoderWindow") {
                    if (event.data.callback === "encoderListeningChanged") {
                        service.encoderWindowIsListening = service.listenerResponse.OPENENCODER === event.data.value;
                        if (service.encoderWindowIsListening) {
                            needsAuthentication = service.workflow.length === 0 || service.workflow.length > 0 && service.workflow[0].name !== 'setAuthToken';
                        }
                        else {
                            closeEncoderWindow();
                        }
                    }
                    else if (event.data.callback === 'encoderRefreshed') {
                        callback = 'sdkServiceResponse';
                        clearWorkflow();
                    }
                    else {
                        callback = 'sdkServiceResponse';
                    }
                }
                break;
            case 'sdkRequestException':
                service.listenerException = true;
                callback = event.data.action;
                break;
            default:
                break;
        }

        invokeCallback(callback, event.data);

        if (service.listenerException) {
            stopWorkflow();
            service.listenerException = false;
        }

        var cwf = event.data.sender === 'kcWindow' ? service.kcWindow.currentWorkflow : service.encoderWindow.currentWorkflow;

        if (!cwf) {
            stopWorkflow();
            return;
        }

        if (needsAuthentication) {
            service.workflow.unshift({
                name: 'setAuthToken',
                fn: service[event.data.sender].setAuthToken,
                sendToWindow: [event.data.sender],
                args: [service[event.data.sender].authTokenData, service[event.data.sender].name]
            });
        }

        if (service.workflow.length === 0) {
            clearTimeout(service[event.data.sender].responseTime);
        }

        if (cwf && cwf.workflowCompleteMessage === event.data.value) {
            clearTimeout(service[event.data.sender].responseTime);
            processWorkflow(service[event.data.sender]);
        }

    }, false);

    window.addEventListener('unload', function (event) {
        service.closeAllKCWindows();
    });

    return service;
    /////////////// return service

    function openKc(url, authToken) {
        if (!service.kcWindow.reference || !windowExists(service.kcWindow) || !service.kcWindowIsListening) {
            kcWindow.authTokenData = authToken;

            service.kcWindow.reference = window.open(url, kcWindowName, kcWindowParams);
            service.kcWindow.opened = true;
            service.kcWindow.reference.focus();
        }
        else {
            service.kcWindow.reference.focus();
            processWorkflow(service.kcWindow);
        }
    }

    function openEncoder(url, authToken) {
        if (!service.encoderWindow.reference || !windowExists(service.encoderWindow) || !service.encoderWindowIsListening) {
            encoderWindow.authTokenData = authToken;

            service.encoderWindow.reference = window.open(url, encoderWindowName, encoderWindowParams);
            service.encoderWindow.opened = true;
            service.encoderWindow.reference.focus();
        }
        else {
            service.encoderWindow.reference.focus();
            processWorkflow(service.encoderWindow);
        }
    }

    // apis to send to our open windows
    function loadPhraseInLogic(input) {
        communicationPacket.action = 'logicRequest';
        communicationPacket.value = input;
        communication(communicationPacket, listeningWindows.ENCODER);
    }

    function loadPhraseInIndex(input) {
        communicationPacket.action = 'indexRequest';
        communicationPacket.value = input;
        communication(communicationPacket, listeningWindows.ENCODER);
    }

    function loadCodeInTabular(input) {
        communicationPacket.action = 'tabularRequest';
        communicationPacket.value = input;
        communication(communicationPacket, listeningWindows.ENCODER);
    }

    function loadPatientRecord(patientRecord) {
        communicationPacket.action = 'loadPatientRecord';
        communicationPacket.value = patientRecord;
        communication(communicationPacket, listeningWindows.KC);
    }

    function assignConfig(input) {
        communicationPacket.action = 'assignConfig';
        communicationPacket.value = input;
        communication(communicationPacket, listeningWindows.KC);
    }

    function setI9I10State(state) {
        communicationPacket.action = 'setI9I10State';
        communicationPacket.value = state;
        communication(communicationPacket, listeningWindows.ALL);
    }
    function setAuthToken(data) {
        communicationPacket.action = 'setAuthToken';
        communicationPacket.value = data;
        communication(communicationPacket, listeningWindows.ALL);
    }

    function setDemographics(demographicsData) {
        communicationPacket.action = 'setDemographics';
        communicationPacket.value = demographicsData;
        communication(communicationPacket, listeningWindows.ALL);
    }

    function encoderStartupComplete() {
        communicationPacket.action = 'encoderStartupComplete';
        communicationPacket.value = '';
        communication(communicationPacket, listeningWindows.ENCODER);
    }

    function closeAllKCWindows() {
        communicationPacket.action = 'closeAllKCWindows';
        communicationPacket.value = null;
        communication(communicationPacket, listeningWindows.ALL);
    }

    // workflow to launch kc
    function launchKc(url, authToken, state, demographics) {
        kcWindow.authTokenData = authToken;

        var wfArray = [{
            fn: openKc,
            args: [url, authToken]
        }, {
            fn: setI9I10State,
            args: state
        }, {
            fn: setDemographics,
            args: demographics
        }];

        var updatedWf = wfArray.concat(service.workflow);
        service.clearWorkflow();

        service.addToWorkflow(updatedWf);

        service.processWorkflow(service.kcWindow);

    }

    // workflow to launch encoder
    function launchEncoder(url, authToken, state, demographics, request) {
        encoderWindow.authTokenData = authToken;

        var logicIndexRequest = JSON.stringify({
            sessionType: request.sessionType,
            phrase: request.codePhrase
        }, null, 2)

        var tabularRequest = JSON.stringify({
            sessionType: request.sessionType,
            code: request.codePhrase
        }, null, 2)

        var wfArray = [{
            fn: openEncoder,
            args: [url, authToken]
        }, {
            fn: setI9I10State,
            args: state
        }, {
            fn: setDemographics,
            args: demographics
        }, {
            fn: encoderStartupComplete,
            args:[]
        }];

        if (request.encoderTab === service.encoderTabs.LOGIC) {
            wfArray.push({
                fn: loadPhraseInLogic,
                args: logicIndexRequest
            });
        }
        else if (request.encoderTab === service.encoderTabs.INDEX) {
            wfArray.push({
                fn: loadPhraseInIndex,
                args: logicIndexRequest
            });
        }
        else if (request.encoderTab === service.encoderTabs.TABULAR) {
            wfArray.push({
                fn: loadCodeInTabular,
                args: tabularRequest
            });
        }

        var updatedWf = wfArray.concat(service.workflow);
        service.clearWorkflow();

        service.addToWorkflow(updatedWf);

        service.processWorkflow(service.encoderWindow);

    }

    // window functions
    function communication(packet, listener) {
        try {
            var ourWindows = getWindowsToCommunicate(listener);

            if (ourWindows.length === 0) {
                console.log(new Error('No window listening'));
                return;
            }

            if (packet.value) {
                packet.value = typeof packet.value === 'string' ? JSON.parse(packet.value) : packet.value;
            }
            ourWindows.forEach(function (w) {
                w.responseTime = 0;
                packet.windowName = w.name;
                messagingProvider.post(w.reference, packet);
                responseTimeout(packet, w);
            });
        } catch (e) {
            console.log(e);
            stopWorkflow();
            invokeCallback(service.callbacks.SDKEXCEPTION, { callback: packet.action, value: e });
        }
    }

    function getWindowsToCommunicate(listener) {
        var windowArray = [];

        switch (listener) {
            case listeningWindows.ENCODER:
                if (service.encoderWindowIsListening) {
                    windowArray.push(service.encoderWindow);
                }
                break;

            case listeningWindows.KC:
                if (service.kcWindowIsListening) {
                    windowArray.push(service.kcWindow);
                }
                break;

            case listeningWindows.ALL:
                if (service.kcWindowIsListening) {
                    windowArray.push(service.kcWindow);
                }
                if (service.encoderWindowIsListening) {
                    windowArray.push(service.encoderWindow);
                }

                break;

            default:
                return [];
        }

        return windowArray.filter(function (w) {
            return w !== null && windowExists(w);
        });
    }

    function windowExists(window) {
        if (!window.opened) {
            if (!window.name) {
                closeKcWindow();
                closeEncoderWindow();
            }
            if (window.name === service.kcWindow.name) {
                closeKcWindow();
            } else if (window.name === service.encoderWindow.name) {
                closeEncoderWindow();
            }
            return false;
        }

        return true;
    }

    function closeKcWindow() {
        service.kcWindow.opened = false;
        service.kcWindowIsListening = false;
    }

    function closeEncoderWindow() {
        service.encoderWindow.opened = false;
        service.encoderWindowIsListening = false;
    }

    // workflow functions
    function addToWorkflow(wf) {
        var wfArray = Array.isArray(wf) ? wf : [wf];
        var kcWindowFunctions = ['openKc', 'launchKc', 'loadPatientRecord', 'assignConfig'];
        var encoderWindowFunctions = ['openEncoder', 'launchEncoder', 'loadPhraseInLogic', 'loadPhraseInIndex', 'loadCodeInTabular'];
        var allWindowFunctions = ['setI9I10State', 'setAuthToken', 'setDemographics', 'closeAllKCWindows']

        wfArray.forEach(function (w) {
            w.sendToWindow = [];
            if (kcWindowFunctions.indexOf(w.name) > -1) {
                w.sendToWindow.push('kcWindow');
            }
            if (encoderWindowFunctions.indexOf(w.name) > -1) {
                w.sendToWindow.push('encoderWindow');
            }
            if (allWindowFunctions.indexOf(w.name) > -1) {
                w.sendToWindow.push('kcWindow');
                w.sendToWindow.push('encoderWindow');
            }
            w.name = w.fn.name || w.fn.toString().match(/^function\s?([^\s(]*)/)[1];
            service.workflow.push(w);
        });
        return service.workflow;
    }

    function removeFromWorkflow(index) {
        service.workflow.splice(index, 1);
    }

    function processWorkflow(windowToSend) {
        service.workflowComplete = false;
        if (service.workflow.length === 0) {
            stopWorkflow();
            return;
        }

        var cwf = service.workflow.shift() || {};

        if (typeof windowToSend === 'string') {
            if (windowToSend === service.kcWindow.name) {
                windowToSend = service.kcWindow;
            }
            else if (windowToSend === service.encoderWindow.name) {
                windowToSend = service.encoderWindow;
            }
            else {
                stopWorkflow();
                return;
            }
        }
       
        windowToSend.currentWorkflow = cwf;
        cwf.workflowCompleteMessage = listenerResponse[cwf.name.toUpperCase()];
 
        if (!windowToSend.currentWorkflow.fn) {
            stopWorkflow();
            return;
        }
        var args = Array.isArray(windowToSend.currentWorkflow.args) ? windowToSend.currentWorkflow.args : [windowToSend.currentWorkflow.args];

        if (args.length > 0) {
            windowToSend.currentWorkflow.fn.apply(this, args);
        }
        else {
            windowToSend.currentWorkflow.fn.apply();
        }
    }

    function clearWorkflow() {
        service.workflow.length = 0;
        service.currentWorkflow = {};
    }

    function stopWorkflow() {
        service.workflowComplete = true;
        clearTimeout(service.kcWindow.responseTime);
        clearTimeout(service.encoderWindow.responseTime);
        invokeCallback('workflowComplete');
    }

    // handles timeout of calls
    function responseTimeout(packet, window) {
        window.responseTime = setTimeout(function () { responseFailed(packet, window) }, timeoutThresholdSeconds * 1000);
    }

    function responseFailed(packet, window) {
        invokeCallback(service.callbacks.SDKEXCEPTION, { callback: packet.action, value: 'Timed out.' });
        stopWorkflow();
    }

    function setCallback(name, func) {
        callbackFns[name] = func;
    }

    function invokeCallback(callbackName, args) {
        var callbackFn = callbackFns[callbackName];
        var args = Array.isArray(args) ? args : [args];
        if (typeof callbackFn === "function") {
            try {
                callbackFn.apply(this, args);
            } catch (e) {
                console.log(e);
            }
        }
    }
};

(function (window) {
    window.kcSdk = new kcSdk();
})(window);
