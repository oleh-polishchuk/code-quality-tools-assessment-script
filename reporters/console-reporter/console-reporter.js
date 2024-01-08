class ConsoleReporter {
    constructor(processDir, options = {}) {
        this.processDir = processDir;
        this.verbose = options.verbose;
        this.failed = options.failed;
    }

    async report(data) {
        if (this.verbose) {
            if (this.failed) {
                const filteredData = data.filter(({ passCheck }) => !passCheck);
                if (filteredData.length) {
                    console.table(filteredData);
                }
            } else {
                console.table(data);
            }
        }
        const summary = data.reduce((acc, { passCheck }) => {
            if (passCheck) {
                acc.pass++;
            } else {
                acc.fail++;
            }
            acc.match = `${Math.round(acc.pass / acc.total * 100)}%`;
            return acc;
        }, { pass: 0, fail: 0, total: data.length, match: 0 });
        console.table([summary]);
    }
}

module.exports = ConsoleReporter;
