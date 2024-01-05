const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class PreCommitHookInstalledStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Is the pre-commit hook installed?',
            answer: false,
        };
    }

    check() {
        try {
            const preCommitHookPath = path.join(this.directory, '.git/hooks/pre-commit');
            this.result.answer = fs.existsSync(preCommitHookPath);
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm_config_yes=true npx husky-init@8.0.0 --yes`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PreCommitHookInstalledStep;
