const path = require('path');

const Nested = require('./modules/nested');
const Config = require('./modules/config');
const Rules = require('./modules/rules');
const Report = require('./modules/report');

async function main(directory, options = {}) {
    // arguments
    options.processDirs = options.nested
        ? Nested.getProcessDirs(directory)
        : Nested.getProcessDir(directory);
    options.packageDir = path.resolve(__dirname);

    // prepare
    const config = await Config.readConfig(options.packageDir, options);

    // process
    const { results, exitCode } = await Rules.checkProjectsForComplianceWithRules(config.rules, options);

    // report
    await Report.reportResults(config.reporters, results, options);

    return exitCode;
}

module.exports = { main };
