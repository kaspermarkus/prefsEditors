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
            },
            "onDestroy": "gpii.pcp.destroySocket" //TODO KASPER
        },
        invokers: {
            applySettings: {
                "funcName": "gpii.pcp.callFuncDependingOnFlag",
                "args": ["{that}.socketConnected", "{that}.events.onEmitRequest.fire", "{that}.events.onConnectRequest.fire"],
                "dynamic": true
            },
            emit: {
                "funcName": "gpii.pcp.emitMessage",
                "args": ["{that}", "{prefsEditor}.model", "{gpiiStore}.modelTransform", "gpii.prefs.commonTermsTransformationRules"],
                "dynamic": true
            },
            emitTryDifferent: {
                "funcName": "gpii.pcp.emitTryDifferent",
                "args": ["{that}"],
                "dynamic": true
            }
        }
    });

    gpii.pcp.destroySocket = function (that) { //TODO kasper
        console.log("SOCKET GOT DESTROY SIGNAL, so closing");
        if (that.socket) {
            that.socket.disconnect();
        }
    };

    gpii.pcp.callFuncDependingOnFlag = function (condition, trueFunc, falseFunc) {
        condition ? trueFunc() : falseFunc();
        // trueFunc();
    };

    gpii.pcp.emitMessage = function (that, model, transformFunc, transformRules) {
        console.log("socket called for applySettings - component: "+ that.typeName +" with ID " +that.id);
        console.log("emitMessage called");
        var savedSettings = transformFunc(model, transformRules);

        var finalPayload = {};

        // Formatting the payload as discussed

        // fluid.each(savedSettings, function (value, term) {
        //     var application = term.split('/').slice(-2)[0];

        //     var setting = {};
        //     setting[term] = value;

        //     var settingObject = {"settings": setting};

        //     finalPayload[application] = settingObject;
        // });

        finalPayload = savedSettings;

        that.socket.emit("message", finalPayload, fluid.log);
    };

    gpii.pcp.emitTryDifferent = function (that) {
        console.log("Emitting try different signal from PCP")
        if (that.socket) {
            that.socket.emit("tryDifferent", fluid.log);
        }
    };

    gpii.pcp.connectSocket = function (that, url) {
        console.log("Connecting to socket at "+url+" for component: "+ that.typeName +" with ID " +that.id);

        that.socket = io.connect(url);

        that.socket.on("connect", function () {
            console.log("Socket to " + url + " successfully connected for component: "+ that.typeName +" with ID " +that.id);
            that.socketConnected = true;
            that.events.onEmitRequest.fire();
        });
    };

    gpii.pcp.bindErrorHandlers = function (that, events) {
        fluid.each(events, function (event) {
            that.socket.on(event, function (data) {
                fluid.log("DATA: "+data);
                console.log("ERROREOROROROREOEROEROREOOER: "+JSON.stringify(data, null, 2));
                if (event === "disconnect") {
                    console.log("Retrieved disconnect signal so deleting socket");
                    delete that.socket;
                    that.socketConnected = false;
                }
            });
        });
    };

})(jQuery, fluid);
