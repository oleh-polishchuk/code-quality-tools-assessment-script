const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class LintStagedVersionMatch {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'prettier',
            name: 'lint-staged-version-match',
            directory: directory,
            description: 'Does the lint-staged package match the version?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const packageVersion = devDependencies && devDependencies['lint-staged']
            if (packageVersion === '^11.0.0') {
                this.result.passCheck = true;
            }

            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall lint-staged`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev lint-staged@11.0.0`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = LintStagedVersionMatch;

