const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class TSLintInstall {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'tslint',
            directory: directory,
            description: 'Is the tslint package installed?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const packageDevInstalled = devDependencies && devDependencies['tslint'];
            if (packageDevInstalled) {
                this.result.passCheck = true;
            }

            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall tslint`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev tslint@5.20.1`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = TSLintInstall;
