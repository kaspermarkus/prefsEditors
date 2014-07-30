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

    fluid.defaults("gpii.pcp.auxiliarySchema.visualAlternatives", {
        auxiliarySchema: {
            groups: {
                "visualAlternatives": {
                    "type": "gpii.panel.visualAlternatives",
                    "container": ".gpiic-visualAlternatives",
                    "template": "../../src/pmt/pmt-VisualAlternativesGroupContainer.html",
                    "message": "%prefix/message.json",
                    "panels": {
                        "always": [],
                        "gpii.primarySchema.speakText": [],
                        "gpii.primarySchema.visualAlternativesMoreLess": []
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
                        "gpii.primarySchema.speakText": ["volume"]
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

    fluid.defaults("gpii.pcp.auxiliarySchema.textHighlighting", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["textHighlighting"]
                    }
                }
            },
            textHighlighting: {
                "type": "gpii.primarySchema.textHighlighting",
                "panel": {
                    "type": "gpii.adjuster.textHighlighting",
                    "template": "%prefix/textHighlightingTemplate.html",
                    "container": ".textHighlighting",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.punctuationVerbosity", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["punctuationVerbosity"]
                    }
                }
            },
            punctuationVerbosity: {
                "type": "gpii.primarySchema.punctuationVerbosity",
                "panel": {
                    "type": "gpii.adjuster.punctuationVerbosity",
                    "template": "%prefix/punctuationVerbosityTemplate.html",
                    "container": ".punctuationVerbosity",
                    "message": "%prefix/message.json",
                    "classnameMap": {"punctuationVerbosity": "@punctuationVerbosity.classes"}
                },
                "classes": {
                    "none": "radioButton-left",
                    "some": "radioButton-middle radioButton-second",
                    "most": "radioButton-middle radioButton-third",
                    "all": "radioButton-right"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.announceCapitals", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["announceCapitals"]
                    }
                }
            },
            announceCapitals: {
                "type": "gpii.primarySchema.announceCapitals",
                "panel": {
                    "type": "gpii.adjuster.announceCapitals",
                    "template": "%prefix/announceCapitalsTemplate.html",
                    "message": "%prefix/message.json",
                    "container": ".capitals"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.speakTutorialMessages", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["speakTutorialMessages"]
                    }
                }
            },
            speakTutorialMessages: {
                "type": "gpii.primarySchema.speakTutorialMessages",
                "panel": {
                    "type": "gpii.adjuster.speakTutorialMessages",
                    "template": "%prefix/speakTutorialMessagesTemplate.html",
                    "message": "%prefix/message.json",
                    "container": ".tutorials"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.keyEcho", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["keyEcho"]
                    }
                }
            },
            keyEcho: {
                "type": "gpii.primarySchema.keyEcho",
                "panel": {
                    "type": "gpii.adjuster.keyEcho",
                    "template": "%prefix/keyEchoTemplate.html",
                    "message": "%prefix/message.json",
                    "container": ".keyEcho"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.wordEcho", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["wordEcho"]
                    }
                }
            },
            wordEcho: {
                "type": "gpii.primarySchema.wordEcho",
                "panel": {
                    "type": "gpii.adjuster.wordEcho",
                    "template": "%prefix/wordEchoTemplate.html",
                    "message": "%prefix/message.json",
                    "container": ".wordEcho"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.screenReaderTracking", {
        auxiliarySchema: {
            groups: {
                visualAlternatives: {
                    panels: {
                        "gpii.primarySchema.visualAlternativesMoreLess": ["screenReaderTracking"]
                    }
                }
            },
            screenReaderTracking: {
                "type": "gpii.primarySchema.screenReaderTracking",
                "panel": {
                    "type": "gpii.adjuster.followingElement.screenReader",
                    "container": ".screanReaderFollows",
                    "template": "%prefix/followingElementTemplate.html",
                    "message": "%prefix/followingElement.json",
                    "classnameMap": {
                        "followingElement": "@followingElement.classes",
                        "followingElementBorder": "@followingElement.borderClasses"
                    }
                }
            }
        }
    });

    // volume group:

    fluid.defaults("gpii.pcp.auxiliarySchema.volumeGroup", {
        auxiliarySchema: {
            groups: {
                "volume": {
                    "type": "gpii.panel.volumeCollectivePanel",
                    "container": ".gpiic-volumeGroup",
                    "template": "%prefix/VolumeGroupContainer.html",
                    "message": "%prefix/message.json",
                    "panels": {
                        "always": []
                    }
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.universalVolume", {
        auxiliarySchema: {
            groups: {
                volume: {
                    panels: {
                        "always": ["universalVolume"]
                    }
                }
            },
            universalVolume: {
                "type": "gpii.primarySchema.universalVolume",
                "panel": {
                    "type": "gpii.adjuster.universalVolume",
                    "template": "%prefix/universalVolumeTemplate.html",
                    "container": ".universalVolume",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    // language group:

    fluid.defaults("gpii.pcp.auxiliarySchema.languageGroup", {
        auxiliarySchema: {
            groups: {
                "language": {
                    "type": "gpii.panel.languageCollectivePanel",
                    "container": ".gpiic-languageGroup",
                    "template": "%prefix/LanguageGroupContainer.html",
                    "message": "%prefix/message.json",
                    "panels": {
                        "always": []
                    }
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.universalLanguage", {
        auxiliarySchema: {
            groups: {
                language: {
                    panels: {
                        "always": ["universalLanguage"]
                    }
                }
            },
            universalLanguage: {
                "type": "gpii.primarySchema.universalLanguage",
                "panel": {
                    "type": "gpii.adjuster.universalLanguage",
                    "template": "%prefix/universalLanguageTemplate.html",
                    "container": ".universalLanguage",
                    "message": "%prefix/message.json"
                }
            }
        }
    });

    // contrast group:

    fluid.defaults("gpii.pcp.auxiliarySchema.addContrast", {
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
                "type": "gpii.primarySchema.contrastTheme",
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

    fluid.defaults("gpii.pcp.auxiliarySchema.increaseSize", {
        auxiliarySchema: {
            groups: {
                "increaseSize": {
                    "type": "gpii.panel.increaseSizePMT",
                    "container": ".gpiic-prefsEditor-increaseSizePanel",
                    "template": "%prefix/increaseSizeTemplatePMT.html",
                    "message": "%prefix/increaseSize.json",
                    "panels": {
                        "always": [],
                        "gpii.primarySchema.magnifierEnabled": []
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

    fluid.defaults("gpii.pcp.auxiliarySchema.magnification", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        "gpii.primarySchema.magnifierEnabled": ["magnifier"]
                    }
                }
            },
            magnifier: {
                "type": "gpii.primarySchema.magnification",
                "panel": {
                    "type": "gpii.adjuster.magnifierPCP",
                    "container": ".gpiic-prefsEditor-magnifier",
                    "template": "%prefix/magnifierTemplatePCP.html",
                    "message": "%prefix/magnifier.json"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.magnificationPosition", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        "gpii.primarySchema.magnifierEnabled": ["magnifierPosition"]
                    }
                }
            },
            magnifierPosition: {
                "type": "gpii.primarySchema.magnificationPosition",
                "classes": {
                    "Lens": "gpii-increaseSize-magnifierPositionLens gpii-increaseSize-magnifierPositionIconLabel",
                    "FullScreen": "gpii-increaseSize-magnifierPositionFullscreen gpii-increaseSize-magnifierPositionIconLabel",
                    "TopHalf": "gpii-prefsEditor-adjusterIcons gpii-increaseSize-magnifierPositionTop gpii-increaseSize-magnifierPositionIconLabel",
                    "BottomHalf": "gpii-prefsEditor-adjusterIcons gpii-increaseSize-magnifierPositionBottom gpii-increaseSize-magnifierPositionIconLabel",
                    "LeftHalf": "gpii-prefsEditor-adjusterIcons gpii-increaseSize-magnifierPositionLeft gpii-increaseSize-magnifierPositionIconLabel",
                    "RightHalf": "gpii-prefsEditor-adjusterIcons gpii-increaseSize-magnifierPositionRight gpii-increaseSize-magnifierPositionIconLabel"
                },
                "panel": {
                    "type": "gpii.adjuster.magnifierPosition",
                    "container": ".gpiic-prefsEditor-magnifierPosition",
                    "template": "%prefix/magnifierPositionTemplate.html",
                    "message": "%prefix/magnifierPosition.json",
                    "classnameMap": {"magnifierPosition": "@magnifierPosition.classes"}
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.followingElement", {
        auxiliarySchema: {
            followingElement: {
                "classes": {
                    "mouse": "gpii-prefsEditor-adjusterIcons gpii-followingElement-mouseCursorIcon",
                    "caret": "gpii-prefsEditor-adjusterIcons gpii-followingElement-textCursorIcon",
                    "focus": "gpii-prefsEditor-adjusterIcons gpii-followingElement-keyboardFocusIcon"
                },
                "borderClasses": {
                    "topOnly": "gpii-iconCheckAdjusterAreaTopOnlyBorder",
                    "bottomOnly": "gpii-iconCheckAdjusterAreaBottomOnlyBorder",
                    "noBorder": "gpii-iconCheckAdjusterAreaNoBorder"
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.tracking", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        "gpii.primarySchema.magnifierEnabled": ["tracking"]
                    }
                }
            },
            tracking: {
                "type": "gpii.primarySchema.tracking",
                "panel": {
                    "type": "gpii.adjuster.followingElement.magnifier",
                    "container": ".gpiic-prefsEditor-magnifierFollows",
                    "template": "%prefix/followingElementTemplate.html",
                    "message": "%prefix/followingElement.json",
                    "classnameMap": {
                        "followingElement": "@followingElement.classes",
                        "followingElementBorder": "@followingElement.borderClasses"
                    }
                }
            }
        }
    });

    fluid.defaults("gpii.pcp.auxiliarySchema.showCrosshairs", {
        auxiliarySchema: {
            groups: {
                increaseSize: {
                    panels: {
                        "gpii.primarySchema.magnifierEnabled": ["showCrosshairs"]
                    }
                }
            },
            showCrosshairs: {
                "type": "gpii.primarySchema.showCrosshairs",
                "panel": {
                    "type": "gpii.adjuster.showCrosshairs",
                    "container": ".gpiic-prefsEditor-showCrosshairs",
                    "template": "%prefix/iconCheckTemplateShowCrosshairs.html",
                    "message": "%prefix/showCrosshairs.json"
                }
            }
        }
    });

})(jQuery, fluid);
