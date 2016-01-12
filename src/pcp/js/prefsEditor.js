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
                onApply: null,
                onSettingChanged: null,
                onLogin: null
            },
            modelListeners: {
                "*": {
                    "listener": "{socket}.applySettings"
                }
            },
            listeners: {
                "onReady.setATTRapplyButton": {
                    "this": "{that}.dom.applyButton",
                    "method": "attr",
                    "args": ["value", "{that}.msgLookup.applyText"]
                },
                // "onApply.applySettings": { // this seems to call applySettings multiple time.. The modelListener above seems to be sufficient
                //     "listener": "{socket}.applySettings"
                // },
                "onReady.bindApply": {
                    "this": "{that}.dom.applyButton",
                    "method": "click",
                    "args": ["{that}.events.onApply.fire"]
                },
                "onReady.setFullEditorLink": {
                    "this": "{that}.dom.fullEditorLink",
                    "method": "attr",
                    "args": ["href", "{prefsEditorLoader}.options.pmtUrl"]
                },
                "onReset.triggerLogoutEvent": {
                    "listener": "{that}.events.onLogout.fire"
                },
                "onLogout.setUserLoggedIn": {
                    listener: "{that}.applier.requestChange",
                    args: ["userLoggedIn", false]
                },
                "onLogout.gpiiLogout": {
                    listener: "{gpiiSession}.logout"
                },
                "onLogout.disableApplyButton": {
                    "this": "{that}.dom.applyButton",
                    "method": "prop",
                    "args": ["disabled", "true"]
                },
                "onLogout.disableCloudIcon": {
                    "this": "{that}.dom.cloudIcon",
                    "method": "addClass",
                    "args": ["gpii-disabled"]
                },
                "onReady.setApplyButtonButtonText": {
                    "this": "{that}.dom.applyButton",
                    "method": "attr",
                    "args": ["value", "{that}.msgLookup.applyText"]
                },
                "onReady.logoutLinkPreventDefault": {
                    "this": "{that}.dom.logoutLink",
                    "method": "click",
                    "args": ["{that}.preventDefaultLinkEvent"]
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
                "onReady.setFullEditorLinkText": {
                    "this": "{that}.dom.fullEditorLink",
                    "method": "text",
                    "args": ["{that}.msgLookup.fullEditorText"]
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
                "onReady.setTryDifferentTryButtonText": {
                    "this": "{that}.dom.tryDifferentTryButton",
                    "method": "text",
                    "args": ["{that}.msgLookup.tryDifferentTryText"]
                },
                "onReady.setTryDifferentOKButtonText": {
                    "this": "{that}.dom.tryDifferentOKButton",
                    "method": "text",
                    "args": ["{that}.msgLookup.tryDifferentOKText"]
                },
                "onReady.addTryDifferentOKButtonClickHandler": {
                    "this": "{that}.dom.tryDifferentOKButton",
                    "method": "click",
                    "args": ["{that}.closeTryDifferentDialog"]
                },
                "onReady.addTryDifferentTryButtonClickHandler": {
                    "this": "{that}.dom.tryDifferentTryButton",
                    "method": "click",
                    "args": ["{that}.triggerTryDifferent"]
                },
                // "onSettingChanged.updateStatus": {
                //     "funcName": "{that}.events.onNewMessage.fire",
                //     "args": ["{that}.msgLookup.onSettingChangedMessage"]
                // },
                "onLogin.handleLoginEvent": {
                    "funcName": "gpii.pcp.handleLoginEvent",
                    "args": ["{that}", "{arguments}.0", "{arguments}.1"]
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
// TODO KASPER
//<<<<<<< HEAD
//                 showUserStatusBar: {
//                     "this": "{that}.dom.userStatusBar",
//                     "method": "slideDown"
//                 },
                showTryDifferentDialog: {
                    "funcName": "gpii.pcp.showTryDifferentDialog",
                    "args": ["{that}", "{arguments}.0", "{that}.dom.tryDifferentMessageLineLabel", "{that}.dom.tryDifferentMessageContainer"]
                },
                preventDefaultLinkEvent: {
                    "funcName": "gpii.eventUtility.preventDefaultEvent"
                },
                closeMessageDialog: {
                    "funcName": "gpii.pcp.closeMessageDialog",
                    "args": ["{that}", "{that}.dom.messageContainer"]
                },
                closeTryDifferentDialog: {
                    "funcName": "gpii.pcp.closeTryDifferentDialog",
                    "args": ["{that}", "{that}.dom.tryDifferentMessageContainer"]
                },
                triggerTryDifferent: {
                    "funcName": "gpii.pcp.triggerTryDifferent",
                    "args": ["{that}", "{socket}"]
                }
            },
            selectors: {
                cloudIcon: ".gpii-pcp-cloudIcon",
                fullEditorLink: ".gpiic-prefsEditor-fullEditorLink",
                logoutLink: ".gpiic-prefsEditor-userLogoutLink",
                messageContainer: ".gpiic-pcp-statusMessage",
                tryDifferentMessageContainer: ".gpiic-pcp-tryDifferent",
                // TODO KASPER: consider moving trydifferentMessage over here
                learnMore: ".gpiic-pcp-learnMore",
                messageButton: ".gpiic-pcp-messageButton",
                tryDifferentOKButton: ".gpiic-pcp-tryDifferentOKButton",
                tryDifferentTryButton: ".gpiic-pcp-tryDifferentTryButton"
            },
            selectorsToIgnore: ["cloudIcon"]
        }
    });

    gpii.pcp.handleLoginEvent = function (that, token, multiUser) {
        // also called on initializing the PMT in general
        console.log("handling login event for user "+token);
        if (token !== undefined && !multiUser) {
            that.showTryDifferentDialog(token);
        }
    },

    gpii.pcp.showTryDifferentDialog = function (that, userToken, messageLabel, messageElement) {
        var msg = "";

        if (userToken) {
            msg += "<p><b>The system has been configured for the user with the userToken " + userToken +
            ".</b></p>";
        } else {
            msg += "<p><b>A different configuration has been applied to the system.<p><b>";
        }
        msg += "<p>Press <i>'OK'</i> to continue or <i>'Try Different'</i> to get a different configuration of the system.</p>";
        messageLabel.html(msg);

        messageElement.dialog({
            autoOpen: true,
            modal: true,
            appendTo: ".gpii-prefsEditors-panelBottomRow",
            dialogClass: "gpii-dialog-noTitle",
            closeOnEscape: true,
            width: "28em",
            position: { my: "bottom", at: "center", of: ".gpii-prefsEditor-preferencesContainer" }
        });
    };

    gpii.pcp.closeTryDifferentDialog = function (that, messageElement) {
        console.log("gpii.pcp.closeTryDifferentDialog called");
        messageElement.dialog("destroy");
    };

    gpii.pcp.triggerTryDifferent = function (that, socket) {
        console.log("TRY DIFFERENT");
        // clear any pending messages:
        that.messageQueue = [];
        that.closeMessageDialog();

        // close dialog and do the try different
        that.closeTryDifferentDialog();
        $.ajax({
            url: "http://localhost:8081/tryDifferent",
            error: function (req, status, err) {
                console.log("Try different failed -- " + status);
                console.log(err);
            },
            success: function (dat, status) {
                that.showTryDifferentDialog();
                console.log("Try different succeeded");
                console.log(JSON.stringify(dat));

            }
        }).done(function() {
            console.log("submitted try different request")
        });
    };

    gpii.pcp.handleNewMessage = function (that, messageReceived) {
        console.log("gpii.pcp.handleNewMessage called");
        var endingLength = that.options.commonMessageEnding.length;

        var mes = {};
        mes["type"] = messageReceived.type.slice(0, -endingLength);

        switch (mes.type) {
            case "private":
                mes["message"] = messageReceived.message;
                break;
            case "info":
                mes["message"] = messageReceived.message;
                break;
            case "help":
                mes["message"] = messageReceived.message;
                mes["learnMore"] = messageReceived.learnMore;
                break;
        };

        that.messageQueue.push(mes);
        that.events.onMessageUpdate.fire();
    };

    // TODO: perhaps these two functions could be united with pmt's equivalent ones for dialog handling

    gpii.pcp.showMessageDialog = function (that, messageLabel, messageElement) {
        console.log("gpii.pcp.showMessageDialog called");
        if (that.messageQueue.length) {
            var messageToShow = that.messageQueue[0];
            messageLabel.text(messageToShow.message);
        }

        if (messageToShow.type === "help") {
            that.events.onHelpMessage.fire(messageToShow.learnMore);
        } else {
            that.events.onTextMessage.fire();
        }

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
        console.log("gpii.pcp.closeMessageDialog called");
        if (!messageElement.dialog) {
            return;
        }
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
