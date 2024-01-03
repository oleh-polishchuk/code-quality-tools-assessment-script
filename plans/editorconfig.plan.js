const AbstractPlan = require('./abstract.plan');
const {
    EditorconfigFilePresentStep,
    EditorconfigFileMatchesCorporateTemplateStep,
} = require('../steps');

class EditorconfigPlan extends AbstractPlan {
    constructor(directory, corporateTemplatesPath, fix = false) {
        super();
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
}

module.exports = EditorconfigPlan;
