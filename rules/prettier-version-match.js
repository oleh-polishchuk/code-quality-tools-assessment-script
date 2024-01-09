const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class PrettierVersionMatch {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Does the prettier package match the version?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const packageVersion = devDependencies && devDependencies['prettier'];
            if (packageVersion === '^3.1.1') {
                this.result.passCheck = true;
            }

            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall prettier`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev prettier@3.1.1`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = PrettierVersionMatch;

