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
            alsaVolumeLabel: ".gpiic-speakText-alsaVolume-label",
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
})(fluid);
