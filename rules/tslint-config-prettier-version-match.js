const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class TSLintConfigPrettierVersionMatch {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'tslint',
            directory: directory,
            description: 'Does the tslint-config-prettier package match the version?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const packageVersion = devDependencies && devDependencies['tslint-config-prettier'];
            if (packageVersion === '^1.1.0') {
                this.result.passCheck = true;
            }

            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall tslint-config-prettier`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev tslint-config-prettier@1.1.0`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = TSLintConfigPrettierVersionMatch;

