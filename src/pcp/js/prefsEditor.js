/*!
Cloud4all Preferences Management Tools

Copyright 2013 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {
    fluid.defaults("gpii.prefsEditor", {
        gradeNames: ["fluid.prefs.GPIIEditor", "autoInit"],
        prefsEditor: {
            gradeNames: ["fluid.prefs.msgLookup"],
            components: {
                socket: {
                    type: "gpii.pcp.socket"
                }
            },
            socketConnection: {
                "domain": "http://localhost",
                "port": "8081",
                "route": "update",
                "urlTemplate": "%domain:%port/%route"
            },
            members: {
                messageResolver: "{prefsEditorLoader}.msgResolver",
                socketURL: {
                    expander: {
                        funcName: "fluid.stringTemplate",
                        args: ["{that}.options.socketConnection.urlTemplate", "{that}.options.socketConnection"]
                    }
                },
                browserLanguage: {
                    expander: {
                        funcName: "gpii.prefs.i18n.getDefaultLanguage"
                    }
                },
                messageQueue: []
            },
            commonMessageEnding: "Message",
            distributeOptions: [{
                source: "{that}.options.statusMessageID",
                target: "{that > addContrast > contrastEnabled}.options.ariaControls"
            }, {
                source: "{that}.options.statusMessageID",
                target: "{that > addContrast > contrastThemeNoPreview}.options.ariaControls"
            }, {
                source: "{that}.options.statusMessageID",
                target: "{that > increaseSize > magnifierEnabled}.options.ariaControls"
            }],
            events: {
                onLogout: null,
                onAdjusterChange: null,
                onNewMessage: null,
                onMessageUpdate: null,
                onTextMessage: null,
                onHelpMessage: null,
                onSettingChanged: null
            },
            modelListeners: {
                "gpii_primarySchema_fontSize": {
                    "listener": "{socket}.applySettings"
                }
            },
            listeners: {
                "onAdjusterChange.update": {
                    "listener": "{socket}.applySettings"
                },
                "onReady.setFullEditorLink": {
                    "this": "{that}.dom.fullEditorLink",
                    "method": "attr",
                    "args": ["href", "{prefsEditorLoader}.options.pmtUrl"]
                },
                "onLogout.gpiiLogout": {
                    listener: "{gpiiSession}.logout"
                },
                // "onReady.fullEditorLinkPreventDefault": {
                //     "this": "{that}.dom.fullEditorLink",
                //     "method": "click",
                //     "args": ["{that}.preventDefaultLinkEvent"]
                // },
                "onReady.logoutLinkPreventDefault": {
                    "this": "{that}.dom.logoutLink",
                    "method": "click",
                    "args": ["{that}.preventDefaultLinkEvent"]
                },
                "onLogout.updateStatus": {
                    "funcName": "{that}.events.onNewMessage.fire",
                    "args": ["{that}.msgLookup.onLogoutMessagePCP"]
                },
                "onReady.setFullEditorLinkText": {
                    "this": "{that}.dom.fullEditorLink",
                    "method": "text",
                    "args": ["{that}.msgLookup.fullEditorText"]
                },
                "onReady.setLogoutLinkText": {
                    "this": "{that}.dom.logoutLink",
                    "method": "text",
                    "args": ["{that}.msgLookup.logoutText"]
                },
                "onReady.bindLogout": {
                    "this": "{that}.dom.logoutLink",
                    "method": "click",
                    "args": ["{that}.events.onLogout.fire"]
                },
                "onReady.logoutLinkPreventDefault": {
                    "this": "{that}.dom.logoutLink",
                    "method": "click",
                    "args": ["{that}.preventDefaultLinkEvent"]
                },
                "onReady.bindModelChangedListener": {
                    // used instead of the declarative syntax so that
                    // model won't "count" as updated when fetching from
                    // the server. Thus, onSettingChanged is not fired on load.
                    "listener": "{that}.applier.modelChanged.addListener",
                    "args": ["", "{that}.events.onSettingChanged.fire"]
                },
                "onReady.setMessageButtonText": {
                    "this": "{that}.dom.messageButton",
                    "method": "text",
                    "args": ["{that}.msgLookup.messageButtonText"]
                },
                "onSettingChanged.updateStatus": {
                    "funcName": "{that}.events.onNewMessage.fire",
                    "args": ["{that}.msgLookup.onSettingChangedMessage"]
                },
                "onNewMessage.handleMessage": {
                    "funcName": "gpii.pcp.handleNewMessage",
                    "args": ["{that}", "{arguments}.0"]
                },
                "onMessageUpdate.showMessage": {
                    "funcName": "gpii.pcp.showMessageDialog",
                    "args": ["{that}", "{that}.dom.messageLineLabel", "{that}.dom.messageContainer"]
                },
                "onTextMessage.hideLearnMoreLink": {
                    "this": "{that}.dom.learnMore",
                    "method": "hide"
                },
                "onHelpMessage.setText": {
                    "this": "{that}.dom.learnMore",
                    "method": "text",
                    "args": ["{that}.msgLookup.learnMore"]
                },
                "onHelpMessage.showLink": {
                    "this": "{that}.dom.learnMore",
                    "method": "show"
                },
                "onHelpMessage.setLink": {
                    "this": "{that}.dom.learnMore",
                    "method": "attr",
                    "args": ["href", "{arguments}.0"]
                },
                "onReady.closeMessageButton": {
                    "this": "{that}.dom.messageButton",
                    "method": "click",
                    "args": ["{that}.closeMessageDialog"]
                }
            },
            invokers: {
                showUserStatusBar: {
                    "this": "{that}.dom.userStatusBar",
                    "method": "slideDown"
                },
                preventDefaultLinkEvent: {
                    "funcName": "gpii.eventUtility.preventDefaultEvent"
                },
                closeMessageDialog: {
                    "funcName": "gpii.pcp.closeMessageDialog",
                    "args": ["{that}", "{that}.dom.messageContainer"]
                }
            },
            selectors: {
                cloudIcon: ".gpii-pcp-cloudIcon",
                fullEditorLink: ".gpiic-prefsEditor-fullEditorLink",
                logoutLink: ".gpiic-prefsEditor-userLogoutLink",
                messageContainer: ".gpiic-pcp-statusMessage",
                learnMore: ".gpiic-pcp-learnMore",
                messageButton: ".gpiic-pcp-messageButton"
            },
            selectorsToIgnore: ["cloudIcon"]
        }
    });

    gpii.pcp.handleNewMessage = function (that, messageReceived) {
        var endingLength = that.options.commonMessageEnding.length;

        var mes = {};
        mes["type"] = messageReceived.type.slice(0, -endingLength);

        switch (mes.type) {
            case "private":
                mes["message"] = messageReceived.message;
                break;
            case "info":
                mes["message"] = messageReceived.message[that.browserLanguage];
                break;
            case "help":
                mes["message"] = messageReceived.message[that.browserLanguage].message;
                mes["learnMore"] = messageReceived.message[that.browserLanguage].learnMore;
                break;
        };

        that.messageQueue.push(mes);
        that.events.onMessageUpdate.fire();
    };

    // TODO: perhaps these two functions could be united with pmt's equivalent ones for dialog handling

    gpii.pcp.showMessageDialog = function (that, messageLabel, messageElement) {
        if (that.messageQueue.length) {
            var messageToShow = that.messageQueue[0];
            messageLabel.text(messageToShow.message);
        };

        if (messageToShow.type === "help") {
            that.events.onHelpMessage.fire(messageToShow.learnMore);
        } else {
            that.events.onTextMessage.fire();
        };

        messageElement.dialog({
            autoOpen: true,
            modal: true,
            appendTo: ".gpii-prefsEditors-panelBottomRow",
            dialogClass: "gpii-dialog-noTitle",
            closeOnEscape: false,
            width: "28em",
            position: { my: "bottom", at: "center", of: ".gpii-prefsEditor-preferencesContainer" }
        });
    };

    gpii.pcp.closeMessageDialog = function (that, messageElement) {
        messageElement.dialog("destroy");

        var lastMessage = that.messageQueue.shift();

        if (that.messageQueue.length) {
            while (JSON.stringify(that.messageQueue[0]) === JSON.stringify(lastMessage)) {
                that.messageQueue.shift();
            }
        };

        if (that.messageQueue.length) {
            that.events.onMessageUpdate.fire();
        };
    };

})(jQuery, fluid);
