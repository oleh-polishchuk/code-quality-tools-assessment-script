async function checkProjectsForComplianceWithRules(rules, options) {
    const results = [];
    let exitCode = 0;

    for (const projectDir of options.processDirs) {
        options.processDir = projectDir;
        const projectResult = await checkProjectForComplianceWithRules(rules, options);
        results.push(...projectResult.results);
        if (projectResult.exitCode !== 0) {
            exitCode = projectResult.exitCode;
        }
    }

    return { results, exitCode };
}

async function checkProjectForComplianceWithRules(rules, options) {
    const results = [];
    let exitCode = 0;
    for (const { name, value, src } of rules) {
        if (value) {
            let Rule;
            try {
                Rule = require(src);
            } catch (e) {
                console.warn(`Warning! Rule "${name}" is enabled but the file ${src} does not exist. Skipping.`);
                continue;
            }
            const rule = new Rule(options.processDir);
            if (options.debug) {
                console.log(`- Checking rule "${name}"...`);
            }
            let result = await rule.check();
            if (result[0].passCheck === false && exitCode === 0) {
                exitCode = 1;
            }
            if (options.fix) {
                if (result[0].passCheck === false) {
                    if (options.debug) {
                        console.log(`  ↳ Fixing rule "${name}"...`);
                    }
                    result = await rule.fix();
                    exitCode = 0;
                }
            }
            results.push(...result);
        }
    }
    return { results, exitCode };
}

module.exports = {
    checkProjectsForComplianceWithRules,
}
