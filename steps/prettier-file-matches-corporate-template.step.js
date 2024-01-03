const fs = require('fs');
const path = require('path');

class PrettierFileMatchesCorporateTemplateStep {
    constructor(directory, corporateTemplatesPath) {
        this.directory = directory;
        this.corporateTemplatesPath = corporateTemplatesPath;
        this.result = {
            tool: 'prettier',
            directory: this.directory,
            question: 'Does the .prettierrc.js file match the corporate template?',
            answer: false,
        };
    }

    check() {
        try {
            const prettierFilePath = path.join(this.directory, '.prettierrc.js');
            const prettierFile = fs.readFileSync(prettierFilePath, 'utf8');
            const corporatePrettierFilePath = path.join(this.corporateTemplatesPath, '.prettierrc.js');
            const corporatePrettierFile = fs.readFileSync(corporatePrettierFilePath, 'utf8');
            this.result.answer = prettierFile === corporatePrettierFile;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const prettierFilePath = path.join(this.directory, '.prettierrc.js');
            const corporatePrettierFilePath = path.join(this.corporateTemplatesPath, '.prettierrc.js');
            const corporatePrettierFile = fs.readFileSync(corporatePrettierFilePath, 'utf8');
            fs.writeFileSync(prettierFilePath, corporatePrettierFile);
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PrettierFileMatchesCorporateTemplateStep;
