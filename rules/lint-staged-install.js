const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class LintStagedInstall {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(this.directory, 'package.json');
        this.result = {
            group: 'prettier',
            name: 'lint-staged-install',
            directory: directory,
            description: 'Is the lint-staged package installed?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const lintStagedDevInstalled = devDependencies && devDependencies['lint-staged'];
            if (lintStagedDevInstalled) {
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

module.exports = LintStagedInstall;
