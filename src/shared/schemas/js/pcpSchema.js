/*
 * Helper file for Alex's convenience. Will be deleted once our work is merged.
 */

/*!
Cloud4all Preferences Management Tools

Copyright 2013 OCAD University
Copyright 2013 CERTH/HIT

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/GPII/prefsEditors/LICENSE.txt
*/

/*global fluid, jQuery, gpii*/
/*jslint white: true, onevar: true, funcinvoke: true, forvar: true, undef: true, newcap: true, nomen: true, regexp: true, plusplus: true, bitwise: true, maxerr: 50, indent: 4 */

(function ($, fluid) {
    fluid.registerNamespace("gpii.pcp");

    // This function is used to surround FLUID-5381

    fluid.limitedArrayConcatPolicy = function (target, source) {
        var target = target || {};
        var paths = [["gpii.primarySchema.speakText"], ["always"], ["gpii.primarySchema.visualAlternativesMoreLess"], ["gpii.primarySchema.magnifierEnabled"]];

        fluid.each(paths, function (path) {
            var targetElement = fluid.get(target, path);
            var sourceElement = fluid.get(source, path);
            if (targetElement || sourceElement) {
                var mergedElement = fluid.makeArray(targetElement).concat(fluid.makeArray(sourceElement));
                fluid.set(target, path, mergedElement);
            }
        });

        return target;
    };

    fluid.defaults("gpii.pcp.auxiliarySchema.common", {
        auxiliarySchema: {
            // The global values:
            "namespace": "gpii.constructedPCP",
            "templatePrefix": "../../src/shared/adjusters/html/commonTerms/", // The common path to settings panel templates
            "template": "../../src/pcp/html/PrefsEditorTemplate-PCP.html",
            "messagePrefix": "../../src/shared/adjusters/messages/" + gpii.prefs.i18n.getDefaultLanguage() + "/",
            "message": "../../src/shared/frames/messages/" + gpii.prefs.i18n.getDefaultLanguage() + "/frames.json"
        }
    });


    fluid.defaults("gpii.pcp.auxiliarySchema.mergePolicy", {
        mergePolicy: {
            "auxiliarySchema.groups.visualAlternatives.panels": fluid.limitedArrayConcatPolicy,
            "auxiliarySchema.groups.increaseSize.panels": fluid.limitedArrayConcatPolicy
        }
    });

})(jQuery, fluid);
