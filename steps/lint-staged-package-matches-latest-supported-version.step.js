const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class LintStagedPackageMatchesLatestSupportedVersionStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Does the lint-staged package matches the latest supported version?',
            answer: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const devDependencies = packageJson.devDependencies;

            const lintStagedVersion = devDependencies && devDependencies['lint-staged']
            if (lintStagedVersion === '^11.0.0') {
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
            await promisify(exec)(`npm install --save-dev lint-staged@11.0.0`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = LintStagedPackageMatchesLatestSupportedVersionStep;

