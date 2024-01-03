const AbstractPlan = require("./abstract.plan");

class PrettierPlan extends AbstractPlan {
    constructor(directory, corporateTemplatesPath, fix = false) {
        super();
        this.steps = [];
        this.fix = fix;
    }
}

module.exports = PrettierPlan;
