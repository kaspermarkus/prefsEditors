(function ($, fluid) {
    fluid.defaults("gpii.pcp.starter", {
        gradeNames: ["fluid.littleComponent", "autoInit"],
        invokers: {
            renderAdjusters: {
                "funcName": "gpii.pcp.renderPCP"
            }
        }
    });

    gpii.pcp.renderPCP = function (whatToRender) {
        var compulsory = ["gpii.pcp.auxiliarySchema.mergePolicy", "gpii.pcp.progressiveEnhancement", "gpii.pcp.auxiliarySchema.common"];

        var components = fluid.transform(whatToRender, function (adjuster) {
            return "gpii.pcp.auxiliarySchema." + adjuster;
        });

        fluid.prefs.create("#gpiic-pcp", {
            build: {
                gradeNames: compulsory.concat(components),
                primarySchema: gpii.primarySchema
            },
            prefsEditor: {
                gradeNames: ["demo.pcp"]
            }
        });
    };
})(jQuery, fluid);
