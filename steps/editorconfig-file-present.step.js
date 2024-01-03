const fs = require('fs');
const path = require('path');

/**
 * This step checks if the .editorconfig file is present in the project root.
 */
class EditorconfigFilePresentStep {

    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'editorconfig',
            directory: this.directory,
            question: 'Is the .editorconfig config file present?',
            answer: false,
        };
    }

    check() {
        try {
            const configFilePath = path.join(this.directory, '.editorconfig');
            this.result.answer = fs.existsSync(configFilePath);
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const configFilePath = path.join(this.directory, '.editorconfig');
            fs.writeFileSync(configFilePath, '');
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

}

module.exports = EditorconfigFilePresentStep;
