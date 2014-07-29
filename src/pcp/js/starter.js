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
        var visualAlternativesRequiredByLevel = {
            0: ["visualAlternatives"],
            1: ["visualAlternatives", "speakText"],
            2: ["visualAlternatives", "speakText", "visualAlternativesMoreLess"]
        };

        var volumeRequiredByLevel = {
            0: ["volumeGroup"]
        };

        var languageRequiredByLevel = {
            0: ["languageGroup"]
        };

        var addContrastRequiredByLevel = {
            0: ["addContrast"],
            1: ["addContrast", "contrastEnabled"]
        };

        var increaseSizeRequiredByLevel = {
            0: ["increaseSize"],
            1: ["increaseSize", "magnifierEnabled"]
        };

        var visualAlternativesLevels = [
            ["speakText", "screenReaderBrailleOutput"],
            ["wordsSpokenPerMinute", "volume"],
            ["voicePitch", "screenReaderLanguage", "punctuationVerbosity", "announceCapitals", "speakTutorialMessages", "keyEcho", "wordEcho", "textHighlighting", "screenReaderFollows"]
        ];

        var volumeLevels = [["volume"]];

        var languageLevels = [["universalLanguage"]];

        var addContrastLevels = [
            ["contrastEnabled"],
            ["contrast_theme"]  // TODO: rename this to camelCase everywhere
        ];

        var increaseSizeLevels = [
            ["fontSize", "cursorSize", "magnifierEnabled"],
            ["magnifier", "magnifierPosition", "magnifierFollows", "showCrosshairs"]
        ];

        var levelOfAdjuster = function (adjuster, groupLevels) {
            for (i = 0; i < groupLevels.length; i++) {
                if ($.inArray(adjuster, groupLevels[i]) > -1) {
                    return i;
                };
            };
            return -1;
        };

        var deepestLevel = function (arrayOfAdjusters, groupLevels) {
            return Math.max.apply(null, arrayOfAdjusters.map(function (adj) {
                return levelOfAdjuster(adj, groupLevels);
            }));
        };

        // used for adding gradeNames that:
        // 1) aren't part of the model, e.g. grade names for groups
        // 2) have been missed in the preferences set, but should be there,
        //    e.g. if speechRate value is given, but screenReaderTTSEnabled value - not.

        var determineAdditionalGradeNames = function (arrayOfModelAdjusters) {
            var commonModelPartLength = 19;
            var arrayOfAdjusters = fluid.transform(arrayOfModelAdjusters, function (adjuster) {
                return adjuster.substr(commonModelPartLength);
            });

            var groups = [
                [visualAlternativesRequiredByLevel, visualAlternativesLevels],
                [volumeRequiredByLevel, volumeLevels],
                [languageRequiredByLevel, languageLevels],
                [addContrastRequiredByLevel, addContrastLevels],
                [increaseSizeRequiredByLevel, increaseSizeLevels]
            ];

            var additionals = [];

            fluid.each(groups, function (group) {
                toBePushed = group[0][deepestLevel(arrayOfAdjusters, group[1])];
                additionals = additionals.concat(toBePushed);
            });

            for (i = 0; i < additionals.length; i++) {
                if ($.inArray(additionals[i], arrayOfAdjusters) < 0) {
                    arrayOfAdjusters.push(additionals[i]);
                };
            };

            var additionalSchemaAdjusters = fluid.transform(arrayOfAdjusters, function (adjuster) {
                return "gpii.pcp.auxiliarySchema." + adjuster;
            });

            return additionalSchemaAdjusters;
        };

        var required = [
            "gpii.pcp.auxiliarySchema.mergePolicy",
            "gpii.pcp.progressiveEnhancement",
            "gpii.pcp.auxiliarySchema.common",
            "gpii.pcp.auxiliarySchema.volumeGroup",
            "gpii.pcp.auxiliarySchema.languageGroup",
            "gpii.pcp.auxiliarySchema.addContrast",
            "gpii.pcp.auxiliarySchema.followingElement"
        ];

        var modelToRender = fluid.model.transform(preferences, gpii.prefs.commonTermsInverseTransformationRules);
        var modelKeys = Object.keys(modelToRender);
        var additionalGradeNames = determineAdditionalGradeNames(modelKeys);

        fluid.prefs.create("#gpiic-pcp", {
            build: {
                gradeNames: required.concat(additionalGradeNames),
                primarySchema: gpii.primarySchema
            },
            prefsEditor: {
                gradeNames: ["demo.pcp"]
            }
        });
    };
})(jQuery, fluid);
