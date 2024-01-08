const fs = require('fs');
const path = require('path');

class EditorconfigPresent {

    constructor(directory) {
        this.directory = directory;
        this.configPath = path.join(this.directory, '.editorconfig');
        this.result = {
            group: 'editorconfig',
            directory: this.directory,
            description: 'Is the .editorconfig config file present?',
            passCheck: false,
        };
    }

    check() {
        try {
            this.result.passCheck = fs.existsSync(this.configPath);
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            fs.writeFileSync(this.configPath, '');
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

}

module.exports = EditorconfigPresent;
