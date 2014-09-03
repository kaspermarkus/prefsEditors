/*!
Copyright 2014 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

(function ($) {
    fluid.registerNamespace("gpii.tests");

    fluid.defaults("gpii.tests.textfieldStepper", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        components: {
            pcpStarter: {
                type: "gpii.pcp.starter"
            },
            pcpStarterTester: {
                type: "gpii.tests.pcpStarterTester"
            }
        }
    });

    fluid.defaults("gpii.tests.pcpStarterTester", {
        gradeNames: ["fluid.test.testCaseHolder", "autoInit"],
        modules: [{
            name: "gpii.pcp.starter tests",
            tests: [{
                expect: 1,
                name: "not undefined",
                func: "gpii.assertNotUndefined",
                args: ["{pcpStarter}"]
            }]
        }]
    });

    gpii.assertNotUndefined = function (object) {
        jqUnit.assertNotUndefined("The pcp starter component is not undefined", object);
    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.textfieldStepper"
        ]);
    });
})(jQuery);
