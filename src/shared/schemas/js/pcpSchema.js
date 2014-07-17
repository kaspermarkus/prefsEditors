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
        var paths = [["gpii.primarySchema.speakText"], ["always"], ["gpii.primarySchema.visualAlternativesMoreLess"]];

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
            "templatePrefix": "../../src/shared/adjusters/html/", // The common path to settings panel templates
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


    // visualAlternatives group:

    fluid.defaults("gpii.pcp.auxiliarySchema.visualAlternativesGroup", {
        auxiliarySchema: {
            groups: {
                "visualAlternatives": {
                    "type": "gpii.panel.visualAlternatives",
                    "container": ".gpiic-visualAlternatives",
                    "template": "../../src/pmt/pmt-VisualAlternativesGroupContainer.html",
                    "message": "%prefix/message.json",
                    "panels": {
                        "always": [],
                        "gpii.primarySchema.speakText": [
                            // "wordsSpokenPerMinute", "visualAlternativesMoreLess"
                        ],
                        "gpii.primarySchema.visualAlternativesMoreLess": [
                            // "voicePitch", "screenReaderLanguage", "punctuationVerbosity", "announceCapitals", "speakTutorialMessages", "keyEcho", "wordEcho", "textHighlighting", "screenReaderFollows"
                        ]
                    }
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.speakText", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        always: ["speakText"]
                    }
                }
            },
            speakText: {
                "type": "gpii.primarySchema.speakText",
                "panel": {
                    "type": "gpii.adjuster.speakText",
                    "template": "%prefix/onOffSwitchTemplate.html",
                    "container": ".speakText",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.screenReaderBrailleOutput", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        always: ["screenReaderBrailleOutput"]
                    }
                }
            },
            screenReaderBrailleOutput: {
                "type": "gpii.primarySchema.screenReaderBrailleOutput",
                "panel": {
                    "type": "gpii.adjuster.screenReaderBrailleOutput",
                    "template": "%prefix/brailleTemplate.html",
                    "container": ".braille",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.wordsSpokenPerMinute", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.speakText": ["wordsSpokenPerMinute"]
                    }
                }
            },
            wordsSpokenPerMinute: {
                "type": "gpii.primarySchema.wordsSpokenPerMinute",
                "panel": {
                    "type": "gpii.adjuster.wordsSpokenPerMinute",
                    "template": "%prefix/wordsSpokenPerMinute.html",
                    "container": ".words-spoken-per-minute",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.volume", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        always: ["volume"]
                    }
                }
            },
            volume: {
                "type": "gpii.primarySchema.volume",
                "panel": {
                    "type": "gpii.adjuster.volume",
                    "template": "%prefix/volumeTemplate.html",
                    "container": ".volume",
                    "message": "%prefix/message.json"
                }
            }
        }
    });


    fluid.defaults("gpii.pcp.auxiliarySchema.visualAlternativesMoreLess", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.speakText": ["visualAlternativesMoreLess"]
                    }
                }
            },
            visualAlternativesMoreLess: {
                "type": "gpii.primarySchema.visualAlternativesMoreLess",
                "panel": {
                    "type": "gpii.adjuster.visualAlternativesMoreLess",
                    "template": "%prefix/visualAlternativesMoreLessTemplate.html",
                    "message": "%prefix/message.json",
                    "container": ".visualAlternativesMoreLess"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.voicePitch", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["voicePitch"]
                    }
                }
            },
            voicePitch: {
                "type": "gpii.primarySchema.voicePitch",
                "panel": {
                    "type": "gpii.adjuster.voicePitch",
                    "template": "%prefix/voicePitchTemplate.html",
                    "container": ".voicePitch",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.screenReaderLanguage", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["screenReaderLanguage"]
                    }
                }
            },
            screenReaderLanguage: {
                "type": "gpii.primarySchema.screenReaderLanguage",
                "panel": {
                    "type": "gpii.adjuster.screenReaderLanguage",
                    "template": "%prefix/screenReaderLanguageTemplate.html",
                    "container": ".screenReaderLanguage",
                    "message": "%prefix/message.json"
                }
            }
        }
    });


    // contrast group:

    fluid.defaults("gpii.pcp.auxiliarySchema.contrastGroup", {
        auxiliarySchema: {
            groups: {
                "addContrast": {
                    "container": ".gpii-prefsEditor-contrastPanel",
                    "template": "%prefix/addContrastTemplate.html",
                    "message": "%prefix/message.json",
                    "type": "gpii.adjuster.addContrast"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.contrastEnabled", {
        auxiliarySchema: {
            groups: {
                addContrast: {
                    panels: {
                        "always": ["contrastEnabled"]
                    }
                }
            },
            contrastEnabled: {
                "type": "gpii.primarySchema.contrastEnabled",
                "panel": {
                    "type": "gpii.adjuster.contrastEnabled",
                    "container": ".gpiic-contrastEnabled",
                    "template": "%prefix/onOffSwitchTemplate.html",
                    "message": "%prefix/contrast.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.contrastTheme", {
        auxiliarySchema: {
            groups: {
                addContrast: {
                    panels: {
                        "gpii.primarySchema.contrastEnabled": ["contrastTheme"]
                    }
                }
            },
            contrastTheme: {
                "type": "gpii.primarySchema.contrast.theme",
                "classes": {
                    "black-white": "fl-theme-prefsEditor-bw gpii-prefsEditor-theme-bw fl-theme-bw",
                    "white-black": "fl-theme-prefsEditor-wb gpii-prefsEditor-theme-wb fl-theme-wb",
                    "black-yellow": "fl-theme-prefsEditor-by gpii-prefsEditor-theme-by fl-theme-by",
                    "yellow-black": "fl-theme-prefsEditor-yb gpii-prefsEditor-theme-yb fl-theme-yb"
                },
                "panel": {
                    "type": "gpii.adjuster.contrastThemeNoPreview",
                    "container": ".gpiic-contrastTheme",
                    "template": "%prefix/contrastThemeNoPreviewTemplate.html",
                    "message": "%prefix/contrast.json",
                    "classnameMap": {"theme": "@contrastTheme.classes"}
                }
            }
        }
    });

    // increaseSize group:

    fluid.defaults("gpii.pcp.auxiliarySchema.increaseSizeGroup", {
        auxiliarySchema: {
            groups: {
                "increaseSize": {
                    "type": "gpii.panel.increaseSizePCP",
                    "container": ".gpiic-prefsEditor-increaseSizePanel",
                    "template": "%prefix/increaseSizeTemplatePCP.html",
                    "message": "%prefix/increaseSize.json",
                    "panels": {
                        "always": []
                    }
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.fontSize", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["fontSize"]
                    }
                }
            },
            fontSize: {
                "type": "gpii.primarySchema.fontSize",
                "panel": {
                    "type": "gpii.adjuster.textSizePCP",
                    "container": ".gpiic-prefsEditor-textSize",
                    "template": "%prefix/textSizeTemplatePCP.html",
                    "message": "%prefix/textSize.json"
                }
            }
        }
    });

     fluid.defaults("gpii.pcp.auxiliarySchema.cursorSize", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["cursorSize"]
                    }
                }
            },
            cursorSize: {
                "type": "gpii.primarySchema.cursorSize",
                "panel": {
                    "type": "gpii.adjuster.cursorSizePCP",
                    "container": ".gpiic-prefsEditor-cursorSize",
                    "template": "%prefix/cursorSizeTemplatePCP.html",
                    "message": "%prefix/cursorSize.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.magnifierEnabled", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        always: ["magnifierEnabled"]
                    }
                }
            },
            magnifierEnabled: {
                "type": "gpii.primarySchema.magnifierEnabled",
                "panel": {
                    "type": "gpii.adjuster.magnifierEnabled",
                    "container": ".gpiic-prefsEditor-magnifierEnabled",
                    "template": "%prefix/onOffSwitchTemplate.html",
                    "message": "%prefix/magnifier.json"
                }
            }
        }
    });

})(jQuery, fluid);
