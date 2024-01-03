const {
    EditorconfigFilePresentStep,
    EditorconfigFileMatchesCorporateTemplateStep,
} = require('../steps');

class EditorconfigPlan {
    constructor(directory, corporateTemplatesPath, fix = false) {
        this.steps = [
            {
                name: 'Editorconfig file present',
                instance: new EditorconfigFilePresentStep(directory),
                next: {
                    name: 'Editorconfig file matches corporate template',
                    instance: new EditorconfigFileMatchesCorporateTemplateStep(directory, corporateTemplatesPath),
                }
            }
        ];
        this.fix = fix;
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

module.exports = EditorconfigPlan;
