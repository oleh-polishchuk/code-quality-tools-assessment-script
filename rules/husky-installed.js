const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class HuskyInstalled {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Is the husky package installed?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const devDependencies = packageJson.devDependencies;

            const huskyDevInstalled = devDependencies && devDependencies.husky;
            if (huskyDevInstalled) {
                this.result.passCheck = true;
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
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = HuskyInstalled;
