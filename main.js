const path = require('path');

const Config = require('./modules/config');
const Rules = require('./modules/rules');
const Report = require('./modules/report');

async function main(directory, options = {}) {
    // arguments
    options.processDir = path.resolve(directory || process.cwd());
    options.packageDir = path.resolve(__dirname);

    // prepare
    const config = await Config.readConfig(options.packageDir, options);

    // process
    const { results, exitCode } = await Rules.checkProjectForComplianceWithRules(config.rules, options);

    // report
    await Report.reportResults(config.reporters, results, options);

    return exitCode;
}

module.exports = { main };
