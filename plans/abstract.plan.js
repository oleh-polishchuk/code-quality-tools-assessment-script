class AbstractPlan {
    constructor() {
        this.steps = [];
        this.fix = false;
    }

    async handleStep(step, results) {
        console.log(`Checking ${step.name}`);
        let stepResults = await step.instance.check();

        if (this.fix && !stepResults[0].answer) {
            console.log(`Fixing ${step.name}`);
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
