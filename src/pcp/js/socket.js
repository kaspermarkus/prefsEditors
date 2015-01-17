/*!
Cloud4all Preferences Management Tools

Copyright 2014 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {

    fluid.defaults("gpii.pcp.socket", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        members: {
            socketConnected: false,
        },
        events: {
            onConnectRequest: null,
            onEmitRequest: null
        },
        listeners: {
            "onConnectRequest.connectSocket": {
                "funcName": "gpii.pcp.connectSocket",
                "args": ["{that}", "{prefsEditor}.socketURL"]
            },
            "onConnectRequest.bindErrorHandlers": {
                "funcName": "gpii.pcp.bindErrorHandlers",
                "args": ["{that}", ["error", "disconnect"]]
            },
            "onEmitRequest.emit": {
                "func": "{that}.emit"
            }
        },
        invokers: {
            applySettings: {
                "funcName": "gpii.pcp.callFuncDependingOnFlag",
                "args": ["{that}.socketConnected", "{that}.events.onEmitRequest.fire", "{that}.events.onConnectRequest.fire"],
                "dynamic": true
            },
            emit: {
                "funcName": "gpii.pcp.emitMessage",
                "args": ["{that}", "{prefsEditor}.model", "{gpiiStore}.modelTransform", "gpii.prefs.termsTransformationRules"],
                "dynamic": true
            }
        }
    });

    gpii.pcp.callFuncDependingOnFlag = function (condition, trueFunc, falseFunc) {
        condition ? trueFunc() : falseFunc();
    };

    gpii.pcp.emitMessage = function (that, model, transformFunc, transformRules) {
        console.log("emitMessage called");
        var savedSettings = transformFunc(model, transformRules);

        var finalPayload = {};

        // Formatting the payload as discussed

        fluid.each(savedSettings, function (value, term) {
            var application = term.split('/').slice(-2)[0];

            var setting = {};
            setting[term] = value;

            var settingObject = {"settings": setting};

            finalPayload[application] = settingObject;
        });

        that.socket.emit("message", finalPayload, fluid.log);
    };

    gpii.pcp.connectSocket = function (that, url) {
        console.log("Connecting to socket at "+url);
        that.socket = io.connect(url);

        that.socket.on("connect", function () {
            console.log("Socket successfully connected");
            that.socketConnected = true;
            that.events.onEmitRequest.fire();
        });
    };

    gpii.pcp.bindErrorHandlers = function (that, events) {
        fluid.each(events, function (event) {
            that.socket.on(event, function (data) {
                that.socketConnected = false;
                fluid.log("DATA: "+data);
                delete that.socket;
            });
        });
    };

})(jQuery, fluid);
