const fs = require('fs');
const path = require('path');

class PrettierignoreTemplateMatch {
    constructor(directory) {
        this.directory = directory;
        this.prettierignoreFilePath = path.join(this.directory, '.prettierignore');
        this.templatePath = path.join(__dirname, 'templates', '.prettierignore');
        this.result = {
            group: 'prettier',
            directory: this.directory,
            description: 'Does the .prettierignore file match the corporate template?',
            passCheck: false,
        };
    }

    check() {
        try {
            const prettierignoreFileCorporateTemplate = fs.readFileSync(this.templatePath, 'utf8');
            const prettierignoreFile = fs.readFileSync(this.prettierignoreFilePath, 'utf8');
            this.result.passCheck = prettierignoreFile === prettierignoreFileCorporateTemplate;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    fix() {
        try {
            const prettierignoreFileCorporateTemplate = fs.readFileSync(this.templatePath, 'utf8');
            fs.writeFileSync(this.prettierignoreFilePath, prettierignoreFileCorporateTemplate);
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = PrettierignoreTemplateMatch;
