const fs = require('fs');
const path = require('path');

class EditorconfigTemplateMatch {

    constructor(directory) {
        this.directory = directory;
        this.configPath = path.join(this.directory, '.editorconfig');
        this.templatePath = path.join(__dirname, 'templates', '.editorconfig');
        this.result = {
            group: 'editorconfig',
            directory: this.directory,
            description: 'Does the .editorconfig config file match the corporate template?',
            passCheck: false,
        };
    }

    check() {
        try {
            const config = fs.readFileSync(this.configPath, 'utf8');
            const template = fs.readFileSync(this.templatePath, 'utf8');
            this.result.passCheck = config === template;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    fix() {
        try {
            const template = fs.readFileSync(this.templatePath, 'utf8');
            fs.writeFileSync(this.configPath, template);
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = EditorconfigTemplateMatch;
