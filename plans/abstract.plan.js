class AbstractPlan {
    constructor() {
        this.steps = [];
        this.fix = false;
    }

    async handleStep(step, results) {
        let stepResults = await step.instance.check();

        if (this.fix && !stepResults.answer) {
            stepResults = await step.instance.fix();
        }

        results.push(...stepResults);

        if (step.next) {
            await this.handleStep(step.next, results);
        }
    }

    async execute() {
        const results = [];
        for (const step of this.steps) {
            await this.handleStep(step, results);
        }
        return results;
    }
}

module.exports = AbstractPlan;
