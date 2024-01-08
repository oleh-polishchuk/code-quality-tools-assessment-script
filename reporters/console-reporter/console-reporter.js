class ConsoleReporter {
    constructor(processDir, verbose = false) {
        this.processDir = processDir;
        this.verbose = verbose;
    }

    async report(data) {
        if (this.verbose) {
            console.table(data);
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
