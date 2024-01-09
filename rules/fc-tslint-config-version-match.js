const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class FashionCloudTSLintConfigVersionMatch {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'tslint',
            name: 'fc-tslint-config-version-match',
            directory: directory,
            description: 'Does the @fashioncloud/tslint-config package match the version?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const packageVersion = devDependencies && devDependencies['@fashioncloud/tslint-config'];
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
            await promisify(exec)(`npm uninstall @fashioncloud/tslint-config`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev @fashioncloud/tslint-config@1.1.0`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = FashionCloudTSLintConfigVersionMatch;

