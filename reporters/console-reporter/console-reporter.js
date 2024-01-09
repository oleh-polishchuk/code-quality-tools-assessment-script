class ConsoleReporter {
    constructor(options = {}) {
        this.verbose = options.verbose;
        this.failed = options.failed;
    }

    async report(data) {
        data = this.enrichWithProjectName(data);
        data = this.groupBy(data, 'project');

        // --verbose
        if (this.verbose) {
            for (const project in data) {
                const rules = data[project]
                // --failed
                if (this.failed) {
                    const failedRules = rules
                        .filter(({ passCheck }) => !passCheck)
                        .map(this.verboseReducer);
                    if (failedRules.length) {
                        console.log(`\n${project}:`);
                        console.table(failedRules);
                    }
                } else {
                    const allRules = rules.map(this.verboseReducer);
                    console.log(`\n${project}:`);
                    console.table(allRules);
                }
            }
        }

        const summaryData = this.getSummaryData(data);
        const summaryTable = this.getSummaryTable(summaryData);
        console.table(summaryTable);
    }

    // utils

    verboseReducer(rule) {
        return ({
            Group: rule.group,
            Rule: rule.name,
            Description: rule.description,
            'Pass Check': rule.passCheck,
        });
    }

    getSummaryData(data) {
        const result = [];
        for (const project in data) {
            const rules = data[project];
            const resultPerProject = rules.reduce((acc, { passCheck }) => {
                if (passCheck) {
                    acc.pass++;
                } else {
                    acc.fail++;
                }
                acc.match = `${Math.round(acc.pass / acc.total * 100)}%`;
                return acc;
            }, { pass: 0, fail: 0, total: rules.length, match: 0 });
            result.push({ ...resultPerProject, project });
        }
        return result;
    }

    getSummaryTable(data) {
        return data.map(project => ({
            'Project': project.project,
            'Pass': project.pass,
            'Fail': project.fail,
            'Total': project.total,
            'Match': project.match,
        }));
    }

    groupBy(items, key) {
        return items.reduce((acc, item) => {
            (acc[item[key]] = acc[item[key]] || []).push(item);
            return acc;
        }, {});
    };

    enrichWithProjectName(data) {
        return data.map(item => ({
            ...item,
            project: item.directory.split('/').pop(),
        }));
    }
}

module.exports = ConsoleReporter;
