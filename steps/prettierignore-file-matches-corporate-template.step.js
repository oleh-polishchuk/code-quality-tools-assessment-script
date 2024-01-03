const fs = require('fs');
const path = require('path');

class PrettierignoreFileMatchesCorporateTemplateStep {
    constructor(directory, corporateTemplatesPath) {
        this.directory = directory;
        this.corporateTemplatesPath = corporateTemplatesPath;
        this.result = {
            tool: 'prettier',
            directory: this.directory,
            question: 'Does the .prettierignore file match the corporate template?',
            answer: false,
        };
    }

    check() {
        try {
            const prettierignoreFilePath = path.join(this.directory, '.prettierignore');
            const prettierignoreFileCorporateTemplatePath = path.join(this.corporateTemplatesPath, '.prettierignore');
            const prettierignoreFileCorporateTemplate = fs.readFileSync(prettierignoreFileCorporateTemplatePath, 'utf8');
            const prettierignoreFile = fs.readFileSync(prettierignoreFilePath, 'utf8');
            this.result.answer = prettierignoreFile === prettierignoreFileCorporateTemplate;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const prettierignoreFilePath = path.join(this.directory, '.prettierignore');
            const prettierignoreFileCorporateTemplatePath = path.join(this.corporateTemplatesPath, '.prettierignore');
            const prettierignoreFileCorporateTemplate = fs.readFileSync(prettierignoreFileCorporateTemplatePath, 'utf8');
            fs.writeFileSync(prettierignoreFilePath, prettierignoreFileCorporateTemplate);
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PrettierignoreFileMatchesCorporateTemplateStep;
