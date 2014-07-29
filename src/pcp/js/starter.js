(function ($, fluid) {
    fluid.defaults("gpii.pcp.starter", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        invokers: {
            renderAdjusters: {
                "funcName": "gpii.pcp.renderPCP"
            }
        }
    });

    gpii.pcp.renderPCP = function (preferences) {
        var visualAlternativesLevels = {0: ["visualAlternatives"], 1: ["visualAlternatives", "speakText"], 2: ["visualAlternatives", "speakText", "visualAlternativesMoreLess"]};
        var increaseSizeLevels = {0: ["increaseSize"], 1: ["increaseSize", "magnifierEnabled"]};

        var levels = [["speakText", "screenReaderBrailleOutput"],
                      ["wordsSpokenPerMinute", "volume"],
                      ["voicePitch", "screenReaderLanguage", "punctuationVerbosity", "announceCapitals", "speakTutorialMessages", "keyEcho", "wordEcho", "textHighlighting", "screenReaderFollows"]
                     ];

        var levelsIS = [["fontSize", "cursorSize", "magnifierEnabled"], ["magnifier", "magnifierPosition", "magnifierFollows", "showCrosshairs"]];

        var levelOfAdjuster = function (adjuster) {
            for (i = 0; i < levels.length; i++) {
                if ($.inArray(adjuster, levels[i]) > -1) {
                    return i;
                };
            };
            return -1;
        };

        var deepestLevel = function (arrayOfAdjusters) {
            return Math.max.apply(null, arrayOfAdjusters.map(levelOfAdjuster));
        };

        // for visualAlternatives only for now
        var determineAdjusterGradeNames = function (arrayOfModelAdjusters) {
            var commonModelPartLength = 19;
            var arrayOfAdjusters = fluid.transform(arrayOfModelAdjusters, function (adjuster) {
                return adjuster.substr(commonModelPartLength);
            });

            var additionals = visualAlternativesLevels[deepestLevel(arrayOfAdjusters)];
            for (i = 0; i < additionals.length; i++) {
                if ($.inArray(additionals[i], arrayOfAdjusters) < 0) {
                    arrayOfAdjusters.push(additionals[i]);
                };
            };

            var arrayOfSchemaAdjusters = fluid.transform(arrayOfAdjusters, function (adjuster) {
                return "gpii.pcp.auxiliarySchema." + adjuster;
            });

            return arrayOfSchemaAdjusters;
        };

        var compulsory = ["gpii.pcp.auxiliarySchema.mergePolicy", "gpii.pcp.progressiveEnhancement", "gpii.pcp.auxiliarySchema.common", "gpii.pcp.auxiliarySchema.increaseSize", "gpii.pcp.auxiliarySchema.volumeGroup", "gpii.pcp.auxiliarySchema.languageGroup", "gpii.pcp.auxiliarySchema.addContrast", "gpii.pcp.auxiliarySchema.followingElement"];

        var modelToRender = fluid.model.transform(preferences, gpii.prefs.commonTermsInverseTransformationRules);
        var modelKeys = Object.keys(modelToRender);
        var finalAdjusterGradeNames = determineAdjusterGradeNames(modelKeys);

        fluid.prefs.create("#gpiic-pcp", {
            build: {
                gradeNames: compulsory.concat(finalAdjusterGradeNames),
                primarySchema: gpii.primarySchema
            },
            prefsEditor: {
                gradeNames: ["demo.pcp"]
            }
        });
    };
})(jQuery, fluid);
