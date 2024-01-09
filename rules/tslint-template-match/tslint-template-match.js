const fs = require('fs');
const path = require('path');

class TslintTemplateMatch {
    constructor(directory) {
        this.directory = directory;
        this.file = path.join(this.directory, 'tslint.json');
        this.templatePath = path.join(__dirname, 'templates', 'tslint.json');
        this.result = {
            group: 'tslint',
            name: 'tslint-template-match',
            directory: this.directory,
            description: 'Does the tslint.json file match the corporate template?',
            passCheck: false,
        };
    }

    check() {
        try {
            const template = fs.readFileSync(this.templatePath, 'utf8');
            const file = fs.readFileSync(this.file, 'utf8');
            this.result.passCheck = file === template;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    fix() {
        try {
            const template = fs.readFileSync(this.templatePath, 'utf8');
            fs.writeFileSync(this.file, template);
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = TslintTemplateMatch;
