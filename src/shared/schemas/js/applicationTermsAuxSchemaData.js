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

(function ($, fluid) {
    fluid.registerNamespace("gpii.pcp");

    fluid.defaults("gpii.pcp.auxiliarySchema.alsaVolume", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "always": ["alsaVolume"]
                    }
                }
            },
            alsaVolume: {
                "type": "gpii.primarySchema.alsaVolume",
                "panel": {
                    "type": "gpii.adjuster.alsaVolume",
                    "template": "%prefix/../applicationTerms/alsaVolumeTemplate.html",
                    "container": ".alsaVolume",
                    "message": "%prefix/message.json"
                }
            }
        }
    });


})(jQuery, fluid);
