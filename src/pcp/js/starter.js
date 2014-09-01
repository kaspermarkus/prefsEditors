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
        members: {
            modelToRender: {},
            baseAdjusters: []
        },
        listeners: {
            "onRenderRquest.setInitialModelToRender": {
                "funcName": "fluid.set",
                "args": ["{that}", "modelToRender", {
                    expander: {
                        "funcName": "fluid.model.transform",
                        "args": ["{arguments}.0", gpii.prefs.commonTermsInverseTransformationRules]
                    }
                }]
            },
            "onRenderRquest.createAdjusterNames": {
                "funcName": "fluid.set",
                "args": ["{that}", "baseAdjusters", {
                    expander: {
                        "funcName": "fluid.transform",
                        "args": [
                            {
                                expander: {
                                    "funcName": "Object.keys",
                                    "args": ["{that}.modelToRender"]
                                }
                            },
                            "{that}.extractAdjusterNameFromModel"
                        ]
                    }
                }]
            },
            "onRenderRquest.gatherAdditionals": {
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
            extractAdjusterNameFromModel: {
                "funcName": "gpii.pcp.extractAdjusterNameFromModel",
                "args": ["{arguments}.0", "{that}.options.commonModelPartLength"]
            },
            renderAdjusters: {
                "func": "{that}.events.onRenderRquest.fire",
                "args": ["{arguments}.0"]
            },
            gather: {
                "funcName": "gpii.pcp.gatherAdditionals",
                "args": ["{that}", "{that}.modelToRender", "{that}.options.metaGradeNames", [
                    {
                        "expander": {
                            "func": "{visualAlternatives}.determineGradeNames",
                            "args": ["{that}.baseAdjusters"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{volume}.determineGradeNames",
                            "args": ["{that}.baseAdjusters"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{language}.determineGradeNames",
                            "args": ["{that}.baseAdjusters"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{addContrast}.determineGradeNames",
                            "args": ["{that}.baseAdjusters"]
                        }
                    },
                    {
                        "expander": {
                            "func": "{increaseSize}.determineGradeNames",
                            "args": ["{that}.baseAdjusters"]
                        }
                    }
                ]]
            }
        },
        commonModelPartLength: "gpii_primarySchema_".length,
        metaGradeNames: [
            "visualAlternatives",
            "visualAlternativesMoreLess",
            "volumeGroup",
            "languageGroup",
            "addContrast",
            "increaseSize"
        ]
    });

    gpii.pcp.extractAdjusterNameFromModel = function (adjuster, commonModelPartLength) {
        return adjuster.substr(commonModelPartLength);
    };

    fluid.defaults("gpii.pcp.informer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.groupData"]
            }
        }
    });

    fluid.defaults("gpii.pcp.visualAlternativesInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        groupData: [{"0":["visualAlternatives"],"1":["visualAlternatives","speakText"],"2":["visualAlternatives","speakText","visualAlternativesMoreLess"]},[["speakText","screenReaderBrailleOutput"],["wordsSpokenPerMinute","volume"],["voicePitch","screenReaderLanguage","punctuationVerbosity","announceCapitals","speakTutorialMessages","keyEcho","wordEcho","textHighlighting","screenReaderFollows"]]],
    });

    fluid.defaults("gpii.pcp.volumeInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        groupData: [{"0":["volumeGroup"]},[["volume"]]],
    });

    fluid.defaults("gpii.pcp.languageInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        groupData: [{"0":["languageGroup"]},[["universalLanguage"]]],
    });

    fluid.defaults("gpii.pcp.addContrastInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        groupData: [{"0":["addContrast"],"1":["addContrast","contrastEnabled"]},[["contrastEnabled"],["contrastTheme"]]],
    });

    fluid.defaults("gpii.pcp.increaseSizeInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        groupData: [{"0":["increaseSize"],"1":["increaseSize","magnifierEnabled"]},[["fontSize","cursorSize","magnifierEnabled"],["magnifier","magnifierPosition","magnifierFollows","showCrosshairs"]]],
    });

    gpii.pcp.levelOfAdjuster = function (adjuster, groupLevels) {
        for (i = 0; i < groupLevels.length; i++) {
            if ($.inArray(adjuster, groupLevels[i]) > -1) {
                return i;
            };
        };
        return -1;
    };

    gpii.pcp.deepestLevel = function (adjusters, groupLevels) {
        return Math.max.apply(null, adjusters.map(function (adj) {
            return gpii.pcp.levelOfAdjuster(adj, groupLevels);
        }));
    };


    gpii.pcp.determineAdditionalGradesByGroup = function (baseAdjusters, groupData) {
        return groupData[0][gpii.pcp.deepestLevel(baseAdjusters, groupData[1])];
    };


    gpii.pcp.gatherAdditionals = function (that, modelToRender, metaGradeNames, additionals) {
        var commonModelPartLength = "gpii_primarySchema_".length;
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

        that.events.populateGradeNames.fire(modelToRender, additionalSchemaAdjusters);
    };

    // TODO: Rewrite this function more declaratively

    gpii.pcp.populateGradeNames = function (that, modelToRender, additionalGradeNames) {

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
