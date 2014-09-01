(function ($, fluid) {
    fluid.defaults("gpii.pcp.starter", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        events: {
            onRenderRquest: null,
            populateGradeNames: null,
            renderPCP: null
        },
        components: {
            visualAlternatives: {
                "type": "gpii.pcp.visualAlternativesInformer"
            },
            volume: {
                "type": "gpii.pcp.volumeInformer"
            },
            language: {
                "type": "gpii.pcp.languageInformer"
            },
            addContrast: {
                "type": "gpii.pcp.addContrastInformer"
            },
            increaseSize: {
                "type": "gpii.pcp.increaseSizeInformer"
            }
        },
        listeners: {
            "onRenderRquest.populateGradeNames": {
                // "funcName": "gpii.pcp.populateGradeNames",
                // "args": ["{that}", "{that}.options.metaGradeNames", "{that}.options.groupsData", "{arguments}.0"]
                "listener": "{that}.gather",
                "args": ["{arguments}.0"]
            },
            "populateGradeNames.populate": {
                "funcName": "gpii.pcp.populateGradeNames",
                "args": ["{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"]
            },
            "renderPCP.create": {
                "listener": "gpii.pcp.renderPCP",
                "args": ["{arguments}.0"]
            }
        },
        invokers: {
            renderAdjusters: {
                "func": "{that}.events.onRenderRquest.fire",
                "args": ["{arguments}.0"]
            },
            gather: {
                "funcName": "gpii.pcp.gatherAdditionals",
                "args": ["{that}", "{arguments}.0", "{that}.options.metaGradeNames", [
                    {
                        "expander": {
                            "func": "{visualAlternatives}.determineGradeNames",
                            "args": ["{arguments}.0"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{volume}.determineGradeNames",
                            "args": ["{arguments}.0"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{language}.determineGradeNames",
                            "args": ["{arguments}.0"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{addContrast}.determineGradeNames",
                            "args": ["{arguments}.0"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{increaseSize}.determineGradeNames",
                            "args": ["{arguments}.0"]
                        }
                    }
                ]]
            }
        },
        metaGradeNames: [
            "visualAlternatives",
            "visualAlternativesMoreLess",
            "volumeGroup",
            "languageGroup",
            "addContrast",
            "increaseSize"
        ],
        groupsData: [[{"0":["visualAlternatives"],"1":["visualAlternatives","speakText"],"2":["visualAlternatives","speakText","visualAlternativesMoreLess"]},[["speakText","screenReaderBrailleOutput"],["wordsSpokenPerMinute","volume"],["voicePitch","screenReaderLanguage","punctuationVerbosity","announceCapitals","speakTutorialMessages","keyEcho","wordEcho","textHighlighting","screenReaderFollows"]]],[{"0":["volumeGroup"]},[["volume"]]],[{"0":["languageGroup"]},[["universalLanguage"]]],[{"0":["addContrast"],"1":["addContrast","contrastEnabled"]},[["contrastEnabled"],["contrastTheme"]]],[{"0":["increaseSize"],"1":["increaseSize","magnifierEnabled"]},[["fontSize","cursorSize","magnifierEnabled"],["magnifier","magnifierPosition","magnifierFollows","showCrosshairs"]]]]
    });


    fluid.defaults("gpii.pcp.visualAlternativesInformer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        groupData: [{"0":["visualAlternatives"],"1":["visualAlternatives","speakText"],"2":["visualAlternatives","speakText","visualAlternativesMoreLess"]},[["speakText","screenReaderBrailleOutput"],["wordsSpokenPerMinute","volume"],["voicePitch","screenReaderLanguage","punctuationVerbosity","announceCapitals","speakTutorialMessages","keyEcho","wordEcho","textHighlighting","screenReaderFollows"]]],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.groupData"]
            }
        }
    });

    fluid.defaults("gpii.pcp.volumeInformer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        groupData: [{"0":["volumeGroup"]},[["volume"]]],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.groupData"]
            }
        }
    });

    fluid.defaults("gpii.pcp.languageInformer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        groupData: [{"0":["languageGroup"]},[["universalLanguage"]]],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.groupData"]
            }
        }
    });

    fluid.defaults("gpii.pcp.addContrastInformer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        groupData: [{"0":["addContrast"],"1":["addContrast","contrastEnabled"]},[["contrastEnabled"],["contrastTheme"]]],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.groupData"]
            }
        }
    });

    fluid.defaults("gpii.pcp.increaseSizeInformer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        groupData: [{"0":["increaseSize"],"1":["increaseSize","magnifierEnabled"]},[["fontSize","cursorSize","magnifierEnabled"],["magnifier","magnifierPosition","magnifierFollows","showCrosshairs"]]],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.groupData"]
            }
        }
    });

    gpii.pcp.determineAdditionalGradesByGroup = function (preferences, groupData) {
        var commonModelPartLength = "gpii_primarySchema_".length;
        var modelToRender = fluid.model.transform(preferences, gpii.prefs.commonTermsInverseTransformationRules);
        var modelKeys = Object.keys(modelToRender);

        var baseAdjusters = fluid.transform(modelKeys, function (adjuster) {
            return adjuster.substr(commonModelPartLength);
        });

        return groupData[0][deepestLevel(baseAdjusters, groupData[1])];
    };

    levelOfAdjuster = function (adjuster, groupLevels) {
        for (i = 0; i < groupLevels.length; i++) {
            if ($.inArray(adjuster, groupLevels[i]) > -1) {
                return i;
            };
        };
        return -1;
    };

    deepestLevel = function (adjusters, groupLevels) {
        return Math.max.apply(null, adjusters.map(function (adj) {
            return levelOfAdjuster(adj, groupLevels);
        }));
    };

    gpii.pcp.gatherAdditionals = function (that, preferences, metaGradeNames, additionals) {
        var commonModelPartLength = "gpii_primarySchema_".length;
        var modelToRender = fluid.model.transform(preferences, gpii.prefs.commonTermsInverseTransformationRules);
        var modelKeys = Object.keys(modelToRender);
        var baseAdjusters = fluid.transform(modelKeys, function (adjuster) {
            return adjuster.substr(commonModelPartLength);
        });

        var arrayOfAdditionals = Array.prototype.concat.apply([], additionals);

        for (i = 0; i < arrayOfAdditionals.length; i++) {
            if ($.inArray(arrayOfAdditionals[i], baseAdjusters) < 0) {
                baseAdjusters.push(arrayOfAdditionals[i]);  // add every additional adjuster, that has been omitted
                if (metaGradeNames.indexOf(arrayOfAdditionals[i]) < 0) {
                    modelToRender["gpii_primarySchema_" + arrayOfAdditionals[i]] = true; // used to update primarySchema with true values for enabling switches (if they're missed)
                };
            };
        };

        var additionalSchemaAdjusters = fluid.transform(baseAdjusters, function (adjuster) {
            return "gpii.pcp.auxiliarySchema." + adjuster;
        });

        that.events.populateGradeNames.fire(preferences, modelToRender, additionalSchemaAdjusters);
    };

    // TODO: Rewrite this function more declaratively

    gpii.pcp.populateGradeNames = function (that, preferences, modelToRender, additionalGradeNames) {

        for (var key in modelToRender) {
            if (modelToRender.hasOwnProperty(key)) {
                var schemaKey = key.replace(/_/g, ".");
                gpii.primarySchema[schemaKey]["default"] = modelToRender[key];
            };
        };

        var required = [
            "gpii.pcp.auxiliarySchema.mergePolicy",
            "gpii.pcp.progressiveEnhancement",
            "gpii.pcp.auxiliarySchema.common",
            "gpii.pcp.auxiliarySchema.followingElement"
        ];

        var finalGradeNames = required.concat(additionalGradeNames);
        that.events.renderPCP.fire(finalGradeNames);
    };


    gpii.pcp.renderPCP = function (finalGradeNames) {

        fluid.prefs.create("#gpiic-pcp", {
            build: {
                gradeNames: finalGradeNames,
                primarySchema: gpii.primarySchema
            },
            prefsEditor: {
                gradeNames: ["demo.pcp"]
            }
        });
    };
})(jQuery, fluid);
