// enums
var listeningWindows = Object.freeze({
    KC: 'kc',
    ENCODER: 'encoder',
    ALL: 'all'
});

var encoderTabs = Object.freeze({
    LOGIC: 'LOGIC',
    INDEX: 'INDEX',
    TABULAR: 'TABULAR'
});

var sessionTypes = Object.freeze({
    DX: {
        state: ['I9'],
        name: 'DX'
    },
    CMPX: {
        state: ['I9'],
        name: 'PX'
    },
    I10CM: {
        state: ['I10'],
        name: 'I10CM'
    },
    ICD10PCS: {
        state: ['I10'],
        name: 'ICD10PCS'
    },
    HCPCS: {
        state: ['I9', 'I10'],
        name: 'HCPCS'
    }
});

var codeTypes = Object.freeze({
    ADMITDX: {
        state: ['I9'],
        name: 'AdmitDx'
    },
    DX: {
        state: ['I9'],
        name: 'DX'
    },
    CMPX: {
        state: ['I9'],
        name: 'PX'
    },
    ADMIT10DX: {
        state: ['I9'],
        name: 'Admit10Dx'
    },
    I10CM: {
        state: ['I10'],
        name: 'I10CM'
    },
    I10PCS: {
        state: ['I10'],
        name: 'ICD10PCS'
    },
    HCPCS: {
        state: ['I9', 'I10'],
        name: 'HCPCS'
    },
    CPT: {
        state: ['I9', 'I10'],
        name: 'CPT'
    }
});

var i9I10States = Object.freeze({
    I9: { value: 'I9' },
    I10: { value: 'I10' }
});

var listenerResponse = Object.freeze({
    LOADPATIENTRECORD: 'loadPatientRecord Complete',
    SETAUTHTOKEN: 'setAuthToken Complete',
    SETI9I10STATE: 'setI9I10State Complete',
    SETDEMOGRAPHICS: 'setDemographics Complete',
    LOADPHRASEINLOGIC: 'logicRequest Received',
    LOADPHRASEININDEX: 'indexRequest Received',
    LOADCODEINTABULAR: 'tabularRequest Received',
    ENCODEREXCEPTION: 'encoder listener exception: ',
    KCEXCEPTION: 'kc listener exception: ',
    OPENENCODER: 'encoderListening',
    OPENKC: 'kcListening',
    ENCODERSTARTUPCOMPLETE: 'Encoder Startup Complete'
});


var callbacks = Object.freeze({
    SDKEXCEPTION: 'sdkRequestException',
    SDKRESPONSE: 'sdkServiceResponse',
    SAVEPATIENTRECORD: 'savePatientRecord',
    CODESADDED: 'codesAdded',
    KCLISTENINGCHANGED: 'kcListeningChanged',
    ENCODERLISTENINGCHANGED: 'encoderListeningChanged',
    WORKFLOWCOMPLETE: 'workflowComplete',
    UNAUTHORIZED: 'unAuthorized'
});

var patientType = Object.freeze({
    INPATIENT: {
        payer_number: "01",
        payer_name: "Acute Inpatient",
        displayValue: "01 Acute Inpatient"
    },
    OUTPATIENT: {
        payer_number: "02",
        payer_name: "Outpatient",
        displayValue: "02 Outpatient"
    },
    IRF: {
        payer_number: "03",
        payer_name: "Inpatient Rehabilitation",
        displayValue: "03 Inpatient Rehabilitation"
    },
    SNF: {
        payer_number: "06",
        payer_name: "Skilled Nursing Facility",
        displayValue: "06 Skilled Nursing Facility"
    }
});

var messagingProvider = {
    initialized: false,
    currentHandler: null,

    init: function () {
        this.initialized = true;
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

        eventer(messageEvent, function (e) {
            var callback = this.currentHandler;
            if (callback != null) {
                var key = e.message ? "message" : "data";
                var data = e[key];
                callback(data);
            }
        }, false);
    },

    post: function (target, message) {
        if (target) {
            target.postMessage(message, '*');
        }
    }
}

var kcMreService = {
    launchMre: function (code, codeType, accessToken) {

        code = adjustCodeForDecimal.adjust(code, codeType);
        var serviceBase = kcSdkConfig.mreServiceBase;
        var appName = 'MRE';
        var codeTypeUrlHandler = {};

        codeTypeUrlHandler.CPT = 'cptHandler.do?_k=101*';
        codeTypeUrlHandler.HCPCS = 'hcpcsHandler.do?_k=102*';
        codeTypeUrlHandler.DX = 'i9v1Handler.do?_k=103*';
        codeTypeUrlHandler.PX = 'i9v3Handler.do?_k=104*';
        codeTypeUrlHandler.I10CM = 'i10cmHandler.do?_k=201*';
        codeTypeUrlHandler.ICD10PCS = 'i10pcsHandler.do?_k=202*';

        var relayUrl = '';
        var encodedUrl = '';
        
        if (code !== null && codeType !== null) {

            var codeBaseParam = codeType === codeTypes.HCPCS.name ?
                isHcpcsCode(code) ? codeTypes.HCPCS.name : codeTypes.CPT.name : codeType;
            relayUrl = generateRelayUrl(code, codeBaseParam);
        }
        else {
            relayUrl = generateRelayUrl('', '');
        }
        encodedUrl = encodeURIComponent(relayUrl);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var response = JSON.parse(xhttp.responseText);
                if (response.token) {

                    var xhttpOpenToken = new XMLHttpRequest();
                    xhttpOpenToken.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            hasMREBrowserWindowOpened = true;
                            var openToken = xhttpOpenToken.responseText;

                            var mreForm = document.createElement("form");
                            mreForm.target = "MRE";
                            mreForm.method = "POST";
                            mreForm.action = relayUrl;

                            var mreInput = document.createElement("input");
                            mreInput.type = "hidden";
                            mreInput.name = "opentoken";
                            mreInput.value = openToken;
                            mreForm.appendChild(mreInput);

                            window.open("", "MRE");
                            document.body.appendChild(mreForm);
                            mreForm.submit();
                            document.body.removeChild(mreForm);
                        }
                    };
                    xhttpOpenToken.open("GET", kcSdkConfig.tokenServer + 'getMreOpenToken?relayUrl=' + encodedUrl, true);
                    xhttpOpenToken.setRequestHeader('Authorization', 'Bearer ' + response.token);
                    xhttpOpenToken.send();
                }
            }
        };
        xhttp.open("GET", kcSdkConfig.tokenServer + 'ssoLogin/' + kcSdkConfig.appName, true);
        xhttp.setRequestHeader('X-SSO-AuthToken', accessToken);
        xhttp.send();


        function generateRelayUrl(code, codeType) {
            var baseURL = kcSdkConfig.mreBaseUrl + 'ssoHandler.do?_a=home';

            if (code) {
                baseURL = kcSdkConfig.mreBaseUrl + (codeTypeUrlHandler[codeType] ? codeTypeUrlHandler[codeType] : '');
                baseURL = baseURL + code + '&_a=viewDetail';
            }
            return baseURL;
        }

        function isHcpcsCode(code) {
            var modifiedCode = filterCode(code);
            var regExHcpcsCode = /^[A-EG-HJ-MP-V][0-9]{4}$/;
            return regExHcpcsCode.test(modifiedCode);
        }

        function filterCode(code, stripDecimals) {
            var filteredCode = code;
            /* istanbul ignore else */
            if (filteredCode) {
                filteredCode = filteredCode.trim();
                if (stripDecimals) {
                    filteredCode = filteredCode.replace('.', '');
                }
            }
            return filteredCode;
        }
    }
}

var jwt = {
    getJwtData: function (accessToken) {
        var jwtParts = accessToken.split('.');
        if (jwtParts.length === 3) {
            var payload = decodeURI(jwtParts[1]);
            var jwtStringData = atob(payload.replace(/_/g, '/').replace(/-/g, '+'));
            return JSON.parse(jwtStringData);
        }
    }
}


var adjustCodeForDecimal = {
    adjust: function (code, codeType) {
        if (code != null) {
            switch (codeType) {
                case codeTypes.I10CM.name:
                case codeTypes.ADMIT10DX.name:
                    return addDecimal(code, 3);
                case codeTypes.DX.name:
                case codeTypes.ADMITDX.name:
                    return addDecimal(code, code.substring(0, 1) === 'E' ? 4 : 3);
                case codeTypes.CMPX.name:
                    return addDecimal(code, 2);
            }
        }

        function addDecimal(code, length) {
            code = code.replace(".", "");
            if (code.length > length) {
                code = code.substring(0, length) + '.' + code.substring(length);
            }
            return code;
        }

        return code;
    }

};

