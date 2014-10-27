/*!
Cloud4all Preferences Management Tools

Copyright 2013 CERTH/HIT

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

(function ($, fluid) {
    "use strict";
    
    fluid.defaults("gpii.adjuster.contrastThemePCP", {
        gradeNames: ["fluid.prefs.panel.contrast", "autoInit"],
        mergePolicy: {
            "controlValues.theme": gpii.prefs.merging.arrayOverridePolicy
        },
        preferenceMap: {
            "gpii.primarySchema.contrast.theme": {
                "model.value": "default"
            }
        },
        selectors: {
            contrastOptions: ".gpiic-contrast-contrastOptions"
        },
        selectorsToIgnore: ["contrastOptions"],
        listeners: {
            "onDomBind.setContrastOptionstext": {
                "this": "{that}.dom.contrastOptions",
                "method": "text",
                "args": ["{that}.msgLookup.contrastOptions"]
            },
            "onDomBind.style": "{that}.style"
        },
        controlValues: {
            theme: ["bw", "yb", "by", "wb"]
        }
    });
})(jQuery, fluid);
