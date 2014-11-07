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
                volume: {
                    panels: {
                        always: ["alsaVolume"]
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

    fluid.defaults("gpii.pcp.auxiliarySchema.windowsHighContrast", {
        auxiliarySchema: {
            groups: {
                addContrast: {
                    panels: {
                        always: ["windowsHighContrast"]
                    }
                }
            },
            windowsHighContrast: {
                "type": "gpii.primarySchema.windowsHighContrast",
                "panel": {
                    "type": "gpii.adjuster.windowsHighContrast",
                    "template": "%prefix/onOffSwitchTemplate.html",
                    "container": ".windowsHighContrast",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.gnomeMagnification", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["gnomeMagnification"]
                    }
                }
            },
            gnomeMagnification: {
                "type": "gpii.primarySchema.gnomeMagnification",
                "panel": {
                    "type": "gpii.adjuster.gnomeMagnification",
                    "container": ".gnomeMagnification",
                    "template": "%prefix/../applicationTerms/gnomeMagnificationTemplate.html",
                    "message": "%prefix/magnifier.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.gnomeMouseTracking", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["gnomeMouseTracking"]
                    }
                }
            },
            gnomeMouseTracking: {
                "type": "gpii.primarySchema.gnomeMouseTracking",
                "panel": {
                    "type": "gpii.adjuster.gnomeMouseTracking",
                    "template": "%prefix/../applicationTerms/gnomeMouseTrackingTemplate.html",
                    "container": ".gnomeMouseTracking",
                    "message": "%prefix/message.json",
                    "classnameMap": {"gnomeMouseTracking": "@gnomeMouseTracking.classes"}
                },
                "classes": {
                    "none": "radioButton-left",
                    "centered": "radioButton-middle radioButton-second",
                    "push": "radioButton-middle radioButton-third",
                    "proportional": "radioButton-right"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.gnomeTextScaling", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["gnomeTextScaling"]
                    }
                }
            },
            gnomeTextScaling: {
                "type": "gpii.primarySchema.gnomeTextScaling",
                "panel": {
                    "type": "gpii.adjuster.gnomeTextScaling",
                    "template": "%prefix/../applicationTerms/gnomeTextScalingTemplate.html",
                    "container": ".gnomeTextScaling",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.gnomeCursorSize", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["gnomeCursorSize"]
                    }
                }
            },
            gnomeCursorSize: {
                "type": "gpii.primarySchema.gnomeCursorSize",
                "panel": {
                    "type": "gpii.adjuster.gnomeCursorSize",
                    "template": "%prefix/../applicationTerms/gnomeCursorSizeTemplate.html",
                    "container": ".gnomeCursorSize",
                    "message": "%prefix/message.json",
                    "classnameMap": {"gnomeCursorSize": "@gnomeCursorSize.classes"}
                },
                "classes": {
                    "-1": "radioButton-left",
                    "20": "radioButton-middle radioButton-second",
                    "29": "radioButton-middle radioButton-third",
                    "41": "radioButton-right"
                }
            }
        }
    });

})(jQuery, fluid);
