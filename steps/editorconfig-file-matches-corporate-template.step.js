const fs = require('fs');
const path = require('path');

/**
 * This step checks if the .editorconfig file matches the corporate template.
 *
 * Assumptions:
 * - This step assumes that the .editorconfig file is present in the project root.
 */
class EditorconfigFileMatchesCorporateTemplateStep {

    constructor(directory, corporateTemplatesPath) {
        this.directory = directory;
        this.corporateTemplatesPath = corporateTemplatesPath;
        this.result = {
            tool: 'editorconfig',
            directory: this.directory,
            question: 'Does the .editorconfig config file match the corporate template?',
            answer: false,
        };
    }

    check() {
        try {
            const configFilePath = path.join(this.directory, '.editorconfig');
            const corporateTemplateConfigFilePath = path.join(this.corporateTemplatesPath, '.editorconfig');
            const config = fs.readFileSync(configFilePath, 'utf8');
            const corporateTemplateConfig = fs.readFileSync(corporateTemplateConfigFilePath, 'utf8');
            this.result.answer = config === corporateTemplateConfig;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const configFilePath = path.join(this.directory, '.editorconfig');
            const corporateTemplateConfigFilePath = path.join(this.corporateTemplatesPath, '.editorconfig');
            const corporateTemplateConfig = fs.readFileSync(corporateTemplateConfigFilePath, 'utf8');
            fs.writeFileSync(configFilePath, corporateTemplateConfig);
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = EditorconfigFileMatchesCorporateTemplateStep;
