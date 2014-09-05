/*!
Copyright 2014 Astea

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://github.com/gpii/universal/LICENSE.txt
*/

(function ($) {
    fluid.registerNamespace("gpii.tests");

    var exampleModelKey = "gpii_primarySchema_keyEcho";
    var expectedAdjusterName = "keyEcho";

    var modelToWorkWith = {
        "http://registry.gpii.org/common/volume":[{"value":0.4}],
        "http://registry.gpii.org/common/keyEcho":[{"value":true}],
        "http://registry.gpii.org/common/fontSize":[{"value":21}],
        "http://registry.gpii.org/common/speechRate":[{"value":150}],
        "http://registry.gpii.org/common/cursorSize":[{"value":0.8400000000000001}],
        "http://registry.gpii.org/common/magnification":[{"value":2.75}],
        "http://registry.gpii.org/common/showCrosshairs":[{"value":true}],
        "http://registry.gpii.org/common/highContrastTheme":[{"value":"white-black"}],
        "http://registry.gpii.org/common/magnifierPosition":[{"value":"Lens"}]
    };

    var expectedModelToRender = {
        "gpii_primarySchema_contrastEnabled": true,
        "gpii_primarySchema_contrastTheme": "white-black",
        "gpii_primarySchema_cursorSize": 4.2,
        "gpii_primarySchema_fontSize": 21,
        "gpii_primarySchema_keyEcho": true,
        "gpii_primarySchema_magnification": 275,
        "gpii_primarySchema_magnificationPosition": "Lens",
        "gpii_primarySchema_magnifierEnabled": true,
        "gpii_primarySchema_showCrosshairs": true,
        "gpii_primarySchema_speakText": true,
        "gpii_primarySchema_universalVolume": 40,
        "gpii_primarySchema_visualAlternativesMoreLess": true,
        "gpii_primarySchema_wordsSpokenPerMinute": 150
    };

    //  the adjusters taken straight from the preferences set + the additionals that have been gathered
    var expectedAdjusterNames = ["keyEcho", "fontSize", "cursorSize", "magnification", "contrastTheme", "showCrosshairs", "universalVolume", "wordsSpokenPerMinute", "magnificationPosition"].concat(["visualAlternatives", "speakText", "visualAlternativesMoreLess", "addContrast", "contrastEnabled", "increaseSize", "magnifierEnabled"]);



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
                name: "starter is successfully created",
                func: "jqUnit.assertNotUndefined",
                args: ["starter object not undefined", "{starter}"]
            }, {
                expect: 1,
                name: "check extracting adjuster name from model",
                func: "jqUnit.assertEquals",
                args: ["starter transformation from model key to adjuster name", expectedAdjusterName, {
                    expander: {
                        "func": "{starter}.extractAdjusterNameFromModel",
                        "args": [exampleModelKey]
                    }
                }]
            }, {
                name: "check proper craetion of starter members",
                expect: 2,
                sequence: [{
                    func: "{starter}.renderAdjusters",
                    args: [modelToWorkWith]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["create modelToRender member according to given data", expectedModelToRender, "{starter}.modelToRender"]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["hold adjuster names to merge in member baseAdjusters", expectedAdjusterNames, "{starter}.baseAdjusters"]
                }]
            }, {
                name: "check visual alternatives informer",
                expect: 5,
                sequence: [{
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up an empty list of adjusters", [], {
                        expander: {
                            "func": "{starter}.visualAlternatives.determineGradeNames",
                            "args": [[]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up top level adjuster", ["visualAlternatives"], {
                        expander: {
                            "func": "{starter}.visualAlternatives.determineGradeNames",
                            "args": [["speakText"]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up first level adjuster", ["visualAlternatives", "speakText"], {
                        expander: {
                            "func": "{starter}.visualAlternatives.determineGradeNames",
                            "args": [["volume"]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up second level adjuster", ["visualAlternatives", "speakText", "visualAlternativesMoreLess"], {
                        expander: {
                            "func": "{starter}.visualAlternatives.determineGradeNames",
                            "args": [["punctuationVerbosity"]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up third level adjuster", ["visualAlternatives", "speakText", "visualAlternativesMoreLess", "followingElement"], {
                        expander: {
                            "func": "{starter}.visualAlternatives.determineGradeNames",
                            "args": [["screenReaderTracking"]]
                        }
                    }]
                }]
            }, {
                name: "check volume informer",
                expect: 2,
                sequence: [{
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up an empty list of adjusters", [], {
                        expander: {
                            "func": "{starter}.volume.determineGradeNames",
                            "args": [[]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up first level adjuster", ["volumeGroup"], {
                        expander: {
                            "func": "{starter}.volume.determineGradeNames",
                            "args": [["volume"]]
                        }
                    }]
                }]
            }, {
                name: "check language informer",
                expect: 2,
                sequence: [{
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up an empty list of adjusters", [], {
                        expander: {
                            "func": "{starter}.language.determineGradeNames",
                            "args": [[]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up first level adjuster", ["languageGroup"], {
                        expander: {
                            "func": "{starter}.language.determineGradeNames",
                            "args": [["universalLanguage"]]
                        }
                    }]
                }]
            }, {
                name: "check add contrast informer",
                expect: 3,
                sequence: [{
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up an empty list of adjusters", [], {
                        expander: {
                            "func": "{starter}.addContrast.determineGradeNames",
                            "args": [[]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up top level adjuster", ["addContrast"], {
                        expander: {
                            "func": "{starter}.addContrast.determineGradeNames",
                            "args": [["contrastEnabled"]]
                        }
                    }]
                }, {
                    func: "jqUnit.assertDeepEq",
                    args: ["gathering up first level adjuster", ["addContrast", "contrastEnabled"], {
                        expander: {
                            "func": "{starter}.addContrast.determineGradeNames",
                            "args": [["contrastTheme"]]
                        }
                    }]
                }]
            }]
        }]
    });

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.pcpStarter"
        ]);
    });
})(jQuery);
