const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "reports/cucumber-json",
    reportPath: "./reports/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "chrome",
            version: "97.0.4692.71",
        },
        device: "Manoj Gupta Machine",
        platform: {
            name: "MAC",
            version: "Catalina",
        },
    },
});