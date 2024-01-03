const AbstractPlan = require("./abstract.plan");

class TSLintPlan extends AbstractPlan {
    constructor(directory, corporateTemplatesPath, fix = false) {
        super();
        this.steps = [];
        this.fix = fix;
    }
}

module.exports = TSLintPlan;
