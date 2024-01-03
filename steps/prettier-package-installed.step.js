const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class PrettierPackageInstalledStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Is the prettier package installed?',
            answer: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const dependencies = packageJson.dependencies;
            const devDependencies = packageJson.devDependencies;

            const prettierInstalled = dependencies && dependencies.prettier;
            const prettierDevInstalled = devDependencies && devDependencies.prettier;

            if (prettierInstalled || prettierDevInstalled) {
                this.result.success = true;
            }

            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall prettier`, { cwd: this.directory });
            await promisify(exec)(`npm uninstall --save-dev prettier`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev prettier`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = PrettierPackageInstalledStep;
