const fs = require('fs');
const path = require('path');

class PrettierignoreFilePresentStep {
    constructor(directory, corporateTemplatesPath) {
        this.directory = directory;
        this.corporateTemplatesPath = corporateTemplatesPath;
        this.result = {
            tool: 'prettier',
            directory: this.directory,
            question: 'Is the .prettierignore file present?',
            answer: false,
        };
    }

    check() {
        try {
            const configFilePath = path.join(this.directory, '.prettierignore');
            this.result.answer = fs.existsSync(configFilePath);
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const configFilePath = path.join(this.directory, '.prettierignore');
            fs.writeFileSync(configFilePath, '');
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

}

module.exports = PrettierignoreFilePresentStep;
