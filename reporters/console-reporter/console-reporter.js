class ConsoleReporter {
    constructor(processDir) {
        this.processDir = processDir;
    }

    async report(data) {
        console.table(data);
    }
}

module.exports = ConsoleReporter;
