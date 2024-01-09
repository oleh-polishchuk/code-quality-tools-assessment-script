async function reportResults(reporters, data, options) {
    for (const { name, src } of reporters) {
        let Reporter;
        try {
            Reporter = require(src);
        } catch (e) {
            console.warn(`Reporter "${name}" is enabled but the file ${src} does not exist. Skipping.`);
            continue;
        }
        const reporterInstance = new Reporter(options);
        await reporterInstance.report(data);
    }
}

module.exports = {
    reportResults,
}
