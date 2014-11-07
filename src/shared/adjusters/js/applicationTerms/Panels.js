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

    fluid.defaults("gpii.adjuster.gnomeMouseTracking", {
        gradeNames: ["fluid.prefs.panel", "gpii.adjuster.singleSelectionWithKeyboard", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.gnomeMouseTracking": {
                "model.gnomeMouseTracking": "default",
                "controlValues.gnomeMouseTracking": "enum"
            }
        },
        selectors: {
            gnomeMouseTrackingContainer: ".gpiic-gnomeMouseTracking-container",
            gnomeMouseTrackingRow: ".gpiic-speakText-gnomeMouseTracking-row",
            gnomeMouseTrackingOptionLabel: ".gpiic-speakText-gnomeMouseTracking-option-label",
            gnomeMouseTrackingInput: ".gpiic-speakText-gnomeMouseTracking",
            gnomeMouseTrackingLabel: ".gpiic-speakText-gnomeMouseTracking-label",
            singleSelectionLabels: ".gpiic-speakText-gnomeMouseTracking-option-label"
        },
        selectorsToIgnore: ["gnomeMouseTrackingContainer"],
        stringArrayIndex: {
            gnomeMouseTrackingLevel: ["gnomeMouseTracking-none", "gnomeMouseTracking-centered", "gnomeMouseTracking-push", "gnomeMouseTracking-proportional"]
        },
        protoTree: {
            announceLabel: {messagekey: "announce"},
            expander: {
                type: "fluid.renderer.selection.inputs",
                rowID: "gnomeMouseTrackingRow",
                labelID: "gnomeMouseTrackingOptionLabel",
                inputID: "gnomeMouseTrackingInput",
                selectID: "gnomeMouseTracking-selection",
                tree: {
                    optionnames: "${{that}.msgLookup.gnomeMouseTrackingLevel}",
                    optionlist: "${{that}.options.controlValues.gnomeMouseTracking}",
                    selection: "${gnomeMouseTracking}"
                }
            },
            gnomeMouseTrackingLabel: {messagekey: "gnomeMouseTrackingLabel"}
        },
        repeatingSelectors: ["gnomeMouseTrackingRow"],
        listeners: {
            "onDomBind.style": "{that}.style"
        },
        invokers: {
            style: {
                funcName: "gpii.adjuster.gnomeMouseTracking.gnomeMouseTrackingStyle",
                args: [
                    "{that}.dom.gnomeMouseTrackingOptionLabel",
                    "{that}.options.controlValues.gnomeMouseTracking",
                    "{that}.options.classnameMap.gnomeMouseTracking",
                    "{that}.dom.gnomeMouseTrackingContainer",
                    "{that}.dom.gnomeMouseTrackingLabel",
                    "{that}.dom.announceLabel"
                ],
                "dynamic": true
            }
        }
    });

    // TODO: This function should be united with punctuationVerbosity's one.
    // Generally, a component for creating radio button styled adjusters should be created.

    gpii.adjuster.gnomeMouseTracking.gnomeMouseTrackingStyle = function (labels, values, classes, container, titleLabel, announceLabel) {
        fluid.each(labels, function (label, index) {
            label = $(label);
            label.addClass(classes[values[index]]);
            label.prepend('<span></span>');
        });
        container.attr("aria-labelledby", gpii.ariaUtility.getLabelId(titleLabel));
        container.attr("aria-describedby", gpii.ariaUtility.getLabelId(announceLabel));
    };

    fluid.defaults("gpii.adjuster.gnomeTextScaling", {
        gradeNames: ["fluid.prefs.panel", "autoInit"],
        preferenceMap: {
            "gpii.primarySchema.gnomeTextScaling": {
                "model.value": "default",
                "controlValues.gnomeTextScaling.min": "minimum",
                "controlValues.gnomeTextScaling.max": "maximum",
                "controlValues.gnomeTextScaling.step": "divisibleBy"
            }
        },
        selectors: {
            gnomeTextScalingLabel: ".gpiic-gnomeTextScaling-label",
            gnomeTextScaling: ".gpiic-speakText-gnomeTextScaling-stepper"
        },
        selectorsToIgnore: ["gnomeTextScaling"],
        components: {
            textfieldStepper: {
                type: "gpii.adjuster.textfieldStepper",
                container: "{that}.dom.gnomeTextScaling",
                createOnEvent: "afterRender",
                options: {
                    sourceApplier: "{gnomeTextScaling}.applier",
                    rules: {
                        "value": "value"
                    },
                    model: {
                        value: "{gnomeTextScaling}.model.value"
                    },
                    range: "{gnomeTextScaling}.options.controlValues.gnomeTextScaling",
                    labelledbyDomElement: "{gnomeTextScaling}.dom.gnomeTextScalingLabel"
                }
            }
        },
        protoTree: {
            gnomeTextScalingLabel: {messagekey: "gnomeTextScalingLabel"}
        }
    });


})(fluid);
