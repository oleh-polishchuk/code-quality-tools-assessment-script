const fs = require('fs');
const path = require('path');

class PrettierrcTemplateMatch {
    constructor(directory) {
        this.directory = directory;
        this.configPath = path.join(this.directory, '.prettierrc.js');
        this.templatePath = path.join(__dirname, 'templates', '.prettierrc.js');
        this.result = {
            group: 'prettier',
            directory: this.directory,
            description: 'Does the .prettierrc.js file match the corporate template?',
            passCheck: false,
        };
    }

    check() {
        try {
            const prettierFile = fs.readFileSync(this.configPath, 'utf8');
            const corporatePrettierFile = fs.readFileSync(this.templatePath, 'utf8');
            this.result.passCheck = prettierFile === corporatePrettierFile;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const corporatePrettierFile = fs.readFileSync(this.templatePath, 'utf8');
            fs.writeFileSync(this.configPath, corporatePrettierFile);
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PrettierrcTemplateMatch;
