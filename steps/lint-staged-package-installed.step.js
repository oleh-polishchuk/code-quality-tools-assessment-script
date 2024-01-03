const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class LintStagedPackageInstalledStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Is the lint-staged package installed?',
            answer: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const devDependencies = packageJson.devDependencies;

            const lintStagedDevInstalled = devDependencies && devDependencies['lint-staged'];
            if (lintStagedDevInstalled) {
                this.result.answer = true;
            }

            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall lint-staged`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev lint-staged`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = LintStagedPackageInstalledStep;
