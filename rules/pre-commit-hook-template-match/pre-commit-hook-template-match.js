const fs = require('fs');
const path = require('path');

class PreCommitHookTemplateMatch {
    constructor(directory) {
        this.directory = directory;
        this.preCommitHookPath = path.join(this.directory, '.husky', 'pre-commit');
        this.templatePath = path.join(__dirname, 'templates', '.husky', 'pre-commit');
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Does the pre-commit hook match the corporate template?',
            passCheck: false,
        };
    }

    check() {
        try {
            const preCommitHook = fs.readFileSync(this.preCommitHookPath, 'utf8');
            const corporateTemplate = fs.readFileSync(this.templatePath, 'utf8');
            this.result.passCheck = preCommitHook === corporateTemplate;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            const corporateTemplate = fs.readFileSync(this.templatePath, 'utf8');
            fs.writeFileSync(this.preCommitHookPath, corporateTemplate);
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = PreCommitHookTemplateMatch;

