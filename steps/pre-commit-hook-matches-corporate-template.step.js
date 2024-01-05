const fs = require('fs');
const path = require('path');

class PreCommitHookMatchesCorporateTemplateStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Does the pre-commit hook match the corporate template?',
            answer: false,
        };
    }

    check() {
        try {
            const preCommitHookPath = path.join(this.directory, '.git', 'hooks', 'pre-commit');
            const preCommitHook = fs.readFileSync(preCommitHookPath, 'utf8');
            const corporateTemplatePath = path.join(__dirname, '..', 'corporate-templates', '.husky', 'pre-commit');
            const corporateTemplate = fs.readFileSync(corporateTemplatePath, 'utf8');
            this.result.answer = preCommitHook === corporateTemplate;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    async fix() {
        try {
            const preCommitHookPath = path.join(this.directory, '.git', 'hooks', 'pre-commit');
            const corporateTemplatePath = path.join(__dirname, '..', 'corporate-templates', '.husky', 'pre-commit');
            const corporateTemplate = fs.readFileSync(corporateTemplatePath, 'utf8');
            fs.writeFileSync(preCommitHookPath, corporateTemplate);
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PreCommitHookMatchesCorporateTemplateStep;

