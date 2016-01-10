/*!
Cloud4all Preferences Management Tools

Copyright 2013 OCAD University
Copyright 2013 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function (fluid) {
    "use strict";
    
    fluid.registerNamespace("gpii");

    gpii.primarySchema = {
        "gpii.primarySchema.fontSize": {
            "type": "number",
            "default": 12,
            "minimum": 1,
            "divisibleBy": 1
        },
        "gpii.primarySchema.cursorSize": {
            "type": "number",
            "default": 1,
            "minimum": 1,
            "maximum": 5,
            "divisibleBy": 0.2
        },
        "gpii.primarySchema.magnifierEnabled": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.magnification": {
            "type": "number",
            "default": 100,
            "minimum": 100,
            "maximum": 10000,
            "divisibleBy": 25
        },
        "gpii.primarySchema.magnificationPosition": {
            "type": "string",
            "default": "TopHalf",
            "enum": ["Lens", "LeftHalf", "TopHalf", "FullScreen", "RightHalf", "BottomHalf"]
        },
        "gpii.primarySchema.tracking": {
            "type": "string",
            "default": "",
            "enum": ["mouse", "caret", "focus"]
        },
        "gpii.primarySchema.showCrosshairs": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.contrastEnabled": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.contrastTheme": {
            "type": "string",
            "default": "black-white",
            "enum": ["black-white", "white-black", "black-yellow", "yellow-black"]
        },
        "gpii.primarySchema.speakText": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.wordsSpokenPerMinute": {
            "type": "number",
            "default": 130,
            "minimum": 0,
            "divisibleBy": 10
        },
        "gpii.primarySchema.volume": {
            "type": "number",
            "default": 80,
            "minimum": 0,
            "maximum": 100,
            "divisibleBy": 10
        },
        "gpii.primarySchema.visualAlternativesMoreLess": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.voicePitch": {
            "type": "number",
            "default": 80,
            "minimum": 0,
            "maximum": 100,
            "divisibleBy": 10
        },
        "gpii.primarySchema.screenReaderLanguage": {
            "type": "string",
            "default": "en",
            "enum": ["en", "el", "de", "es"]
        },
        "gpii.primarySchema.punctuationVerbosity": {
            "type": "string",
            "default": "none",
            "enum": ["none", "some", "most", "all"]
        },
        "gpii.primarySchema.announceCapitals": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.speakTutorialMessages": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.keyEcho": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.wordEcho": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.textHighlighting": {
            "type": "string",
            "default": "Word",
            "enum": ["Word", "Line", "Sentence", "Paragraph"]
        },
        "gpii.primarySchema.screenReaderTracking": {
            "type": "string",
            "default": "",
            "enum": ["mouse", "caret", "focus"]
        },
        "gpii.primarySchema.screenReaderBrailleOutput": {
            "type": "boolean",
            "default": false
        },
        "gpii.primarySchema.universalVolume": {
            "type": "number",
            "default": 80,
            "minimum": 0,
            "maximum": 100,
            "divisibleBy": 10
        },
        "gpii.primarySchema.universalLanguage": {
            "type": "string",
            "default": "en",
            "enum": ["en", "el", "de", "es"]
        },


        //  Data for application-specific terms


        // Windows

        "gpii.primarySchema.windowsHighContrast": {
            "type": "boolean",
            "default": false
        },

        "gpii.primarySchema.windowsMouseTrails": {
            "type": "number",
            "default": 5,
            "minimum": 1,
            "maximum": 10,
            "divisibleBy": 1
        },

        // Linux

        "gpii.primarySchema.alsaVolume": {
            "type": "number",
            "default": 50,
            "minimum": 0,
            "maximum": 100,
            "divisibleBy": 10
        },

        "gpii.primarySchema.gnomeMagnification": {
            "type": "number",
            "default": 100,
            "minimum": 100,
            "maximum": 10000,
            "divisibleBy": 25
        },

        "gpii.primarySchema.gnomeMouseTracking": {
            "type": "string",
            "default": "none",
            "enum": ["none", "centered", "push", "proportional"]
        },

        "gpii.primarySchema.gnomeTextScaling": {
            "type": "number",
            "default": 100,
            "minimum": 1,
            "maximum": 10000,
            "divisibleBy": 25
        },

        "gpii.primarySchema.gnomeCursorSize": {
            "type": "number",
            "default": 20,
            "enum": ["-1", "20", "29", "41"]
        }
    };

})(fluid);
