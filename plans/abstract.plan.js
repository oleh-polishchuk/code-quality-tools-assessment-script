class AbstractPlan {
    constructor() {
        this.steps = [];
        this.fix = false;
    }

    handleStep(step, results) {
        let stepResults = step.instance.check();

        if (this.fix) {
            stepResults = step.instance.fix();
        }

        results.push(...stepResults);

        if (step.next) {
            this.handleStep(step.next, results);
        }
    }

    execute() {
        const results = [];
        this.steps.forEach(step => {
            this.handleStep(step, results);
        });
        return results;
    }
}

module.exports = AbstractPlan;
