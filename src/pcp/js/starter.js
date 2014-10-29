(function ($, fluid) {

    fluid.defaults("gpii.pcp.starter", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        events: {
            onRenderRquest: null,
            updatePrimarySchema: null,
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
            baseAdjusters: [],
            primarySchema: gpii.primarySchema
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
            "updatePrimarySchema.update": {
                "funcName": "gpii.pcp.updatePrimarySchema",
                "args": ["{that}.modelToRender", "{that}.primarySchema"]
            },
            "populateGradeNames.populate": {
                "funcName": "gpii.pcp.populateGradeNames",
                "args": ["{that}", "{arguments}.0"]
            },
            "renderPCP.create": {
                "listener": "gpii.pcp.renderPCP",
                "args": ["{that}", "{that}.primarySchema", "{arguments}.0"]
            }
        },
        invokers: {
            showMessage: {
                "func": "{that}.prefsEditor.prefsEditorLoader.prefsEditor.events.onNewMessage.fire",
                "args": ["{arguments}.0"],
                "dynamic": true
            },
            extractAdjusterNameFromModel: {
                "funcName": "gpii.pcp.extractAdjusterNameFromModel",
                "args": ["{arguments}.0", "{that}.options.commonModelPart"]
            },
            renderAdjusters: {
                "func": "{that}.events.onRenderRquest.fire",
                "args": ["{arguments}.0"]
            },
            gather: {
                "funcName": "gpii.pcp.gatherAdditionals",
                "args": ["{that}", "{that}.modelToRender", "{that}.baseAdjusters", "{that}.options.metaGradeNames", [
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
        commonModelPart: "gpii_primarySchema_",
        metaGradeNames: [
            "visualAlternatives",
            "volumeGroup",
            "languageGroup",
            "addContrast",
            "increaseSize",
            "followingElement"
        ],
        requiredAuxGrades: [
            "gpii.pcp.auxiliarySchema.mergePolicy",
            "gpii.pcp.progressiveEnhancement",
            "gpii.pcp.auxiliarySchema.common"
        ]
    });

    gpii.pcp.extractAdjusterNameFromModel = function (adjuster, commonModelPart) {
        return adjuster.substr(commonModelPart.length);
    };

    fluid.defaults("gpii.pcp.informer", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        invokers: {
            determineGradeNames: {
                "funcName": "gpii.pcp.determineAdditionalGradesByGroup",
                "args": ["{arguments}.0", "{that}.options.requiredByLevel", "{that}.options.adjusterLevels"]
            }
        }
    });

    fluid.defaults("gpii.pcp.visualAlternativesInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        requiredByLevel: {
            "0": ["visualAlternatives"],
            "1": ["speakText"],
            "2": ["visualAlternativesMoreLess"],
            "3": ["followingElement"]
        },
        adjusterLevels: [
            ["speakText", "screenReaderBrailleOutput"],
            ["wordsSpokenPerMinute", "volume"],
            ["voicePitch", "screenReaderLanguage", "punctuationVerbosity", "announceCapitals", "speakTutorialMessages", "keyEcho", "wordEcho", "textHighlighting"],
            ["screenReaderTracking"]
        ]
    });

    fluid.defaults("gpii.pcp.volumeInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        requiredByLevel: {
            "0": ["volumeGroup"]
        },
        adjusterLevels: [
            ["volume"]
        ]
    });

    fluid.defaults("gpii.pcp.languageInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        requiredByLevel: {
            "0": ["languageGroup"]
        },
        adjusterLevels: [
            ["universalLanguage"]
        ]
    });

    fluid.defaults("gpii.pcp.addContrastInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        requiredByLevel: {
            "0": ["addContrast"],
            "1": ["contrastEnabled"]
        },
        adjusterLevels: [
            ["contrastEnabled"],
            ["contrastTheme"]
        ]
    });

    fluid.defaults("gpii.pcp.increaseSizeInformer", {
        gradeNames: ["gpii.pcp.informer", "autoInit"],
        requiredByLevel: {
            "0": ["increaseSize"],
            "1": ["magnifierEnabled"],
            "2": ["followingElement"]
        },
        adjusterLevels: [
            ["fontSize", "cursorSize", "magnifierEnabled"],
            ["magnification", "magnificationPosition", "showCrosshairs"],
            ["tracking"]
        ]
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

    gpii.pcp.gatherUpperLevelGrades = function (requiredByLevel, deepestLevel) {
        var gathered = [];
        for (i = 0; i <= deepestLevel; i++) {
            gathered = gathered.concat(requiredByLevel[i]);
        };
        return gathered;
    };

    gpii.pcp.determineAdditionalGradesByGroup = function (baseAdjusters, requiredByLevel, adjusterLevels) {
        return gpii.pcp.gatherUpperLevelGrades(requiredByLevel, gpii.pcp.deepestLevel(baseAdjusters, adjusterLevels)) || [];
    };

    gpii.pcp.gatherAdditionals = function (that, modelToRender, baseAdjusters, metaGradeNames, additionals) {
        var arrayOfAdditionals = Array.prototype.concat.apply([], additionals);

        fluid.each(arrayOfAdditionals, function (grade) {
            if ($.inArray(grade, baseAdjusters) < 0) {
                baseAdjusters.push(grade);  // add every additional adjuster, that has been omitted
                if (metaGradeNames.indexOf(grade) < 0) {
                    modelToRender[that.options.commonModelPart + grade] = true; // used to update primarySchema with true values for enabling switches (if they're missed)
                };
            };
        });

        var additionalSchemaAdjusters = fluid.transform(baseAdjusters, function (adjuster) {
            return "gpii.pcp.auxiliarySchema." + adjuster;
        });

        that.events.updatePrimarySchema.fire();
        that.events.populateGradeNames.fire(additionalSchemaAdjusters);
    };

    gpii.pcp.updatePrimarySchema = function (modelToRender, primarySchema) {
        for (var key in modelToRender) {
            if (modelToRender.hasOwnProperty(key)) {
                var schemaKey = key.replace(/_/g, ".");
                primarySchema[schemaKey]["default"] = modelToRender[key];
            };
        };
    };

    gpii.pcp.populateGradeNames = function (that, additionalGradeNames) {
        var finalGradeNames = that.options.requiredAuxGrades.concat(additionalGradeNames);
        that.events.renderPCP.fire(finalGradeNames);
    };

    fluid.defaults("gpii.pcp.prefsEditorReadyInformer", {
        listeners: {
            "onReady.announceBeingReady": {
                "funcName": "gpii.pcp.onPrefsEditorReady"
            }
        }
    });

    gpii.pcp.renderPCP = function (that, primarySchema, finalGradeNames) {

        that.prefsEditor = fluid.prefs.create("#gpiic-pcp", {
            build: {
                gradeNames: finalGradeNames,
                primarySchema: primarySchema
            },
            prefsEditor: {
                gradeNames: ["demo.pcp", "gpii.pcp.prefsEditorReadyInformer"]
            }
        });
    };
})(jQuery, fluid);
