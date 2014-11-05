/*!
Cloud4all Preferences Management Tools

Copyright 2013 Astea
Copyright 2014 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function (fluid) {
    fluid.defaults("gpii.adjuster.windowsHighContrast", {
        gradeNames: ["gpii.adjuster.onOffSwitch", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.windowsHighContrast": {
                "model.windowsHighContrast": "default"
            }
        },
        protoTree: {
            valueCheckbox: "${windowsHighContrast}",
            headingLabel: {messagekey: "windowsHighContrastLabel"}
        },
        onOffModelKey: "windowsHighContrast"
    });


    fluid.defaults("gpii.adjuster.alsaVolume", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.alsaVolume": {
                "model.value": "default",
                "controlValues.alsaVolume.min": "minimum",
                "controlValues.alsaVolume.max": "maximum",
                "controlValues.alsaVolume.step": "divisibleBy"
            }
        },
        selectors: {
            alsaVolumeLabel: ".gpiic-alsaVolume-label",
            alsaVolume: ".gpiic-speakText-alsaVolume-stepper"
        },
        selectorsToIgnore: ["alsaVolume"],
        components: {
            textfieldStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.alsaVolume",
                createOnEvent: "afterRender",
                options: {
                    sourceApplier: "{alsaVolume}.applier",
                    rules: {
                        "value": "value"
                    },
                    model: {
                        value: "{alsaVolume}.model.value"
                    },
                    range: "{alsaVolume}.options.controlValues.alsaVolume",
                    labelledbyDomElement: "{alsaVolume}.dom.alsaVolumeLabel"
                }
            }
        },
        protoTree: {
            alsaVolumeLabel: {messagekey: "alsaVolumeLabel"}
        }
    });

    fluid.defaults("gpii.adjuster.gnomeMagnification", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.gnomeMagnification": {
                "model.magnification": "default",
                "magnification.range.min": "minimum",
                "magnification.range.max": "maximum",
                "magnification.range.step": "divisibleBy"
            }
        },
        members: {
            messageResolver: "{prefsEditorLoader}.msgResolver"
        },
        selectors: {
            magnifierLabel: ".gpiic-magnifier-label",
            magnificationLevel: ".gpiic-magnifier-magnificationLevel",
            magnifierStepper: ".gpiic-magnifier-stepper"
        },
        selectorsToIgnore: ["magnifierStepper"],
        components: {
            magnifierStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.magnifierStepper",
                createOnEvent: "afterRender",
                options: {
                    events: {
                        onAdjusterChange: "{prefsEditor}.events.onAdjusterChange"
                    },
                    modelListeners: {
                        "*": {
                            "listener": "{that}.events.onAdjusterChange.fire"
                        }
                    },
                    sourceApplier: "{gnomeMagnification}.applier",
                    rules: {
                        "magnification": "value"
                    },
                    model: {
                        value: "{gnomeMagnification}.model.magnification"
                    },
                    strings: {
                        "unit": "{gnomeMagnification}.msgLookup.magnifierUnit"
                    },
                    range: "{gnomeMagnification}.options.magnification.range",
                    labelledbyDomElement: "{gnomeMagnification}.dom.magnificationLevel"
                }
            }
        },
        protoTree: {
            magnifierLabel: {messagekey: "magnifierLabel"},
            magnificationLevel: {messagekey: "magnificationLevel"}
        }
    });



})(fluid);
