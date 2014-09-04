/*!
Copyright 2014 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

(function ($) {
    fluid.registerNamespace("gpii.tests");

    fluid.defaults("gpii.tests.pcpStarter", {
        gradeNames: ["fluid.test.testEnvironment", "autoInit"],
        components: {
            starter: {
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
                name: "successfully created",
                func: "gpii.assertNotUndefined",
                args: ["{starter}"]
            }]
        }]
    });

    gpii.assertNotUndefined = function (object) {
        jqUnit.assertNotUndefined("The pcp starter component is not undefined", object);
    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.pcpStarter"
        ]);
    });
})(jQuery);
