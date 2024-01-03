const fs = require('fs');
const path = require('path');

class PrettierFilePresentStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: this.directory,
            question: 'Is the .prettierrc.js file present?',
            answer: false,
        };
    }

    check() {
        try {
            const configFilePath = path.join(this.directory, '.prettierrc.js');
            this.result.answer = fs.existsSync(configFilePath);
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const configFilePath = path.join(this.directory, '.prettierrc.js');
            fs.writeFileSync(configFilePath, '');
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PrettierFilePresentStep;
