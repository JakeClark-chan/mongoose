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