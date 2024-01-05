const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class HuskyPackageMatchesLatestSupportedVersionStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Does the husky package matches the latest supported version?',
            answer: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const devDependencies = packageJson.devDependencies;

            const huskyVersion = devDependencies && devDependencies.husky;
            if (huskyVersion === '^8.0.0') {
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
            await promisify(exec)(`npm uninstall husky`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev husky@8.0.0`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = HuskyPackageMatchesLatestSupportedVersionStep;

