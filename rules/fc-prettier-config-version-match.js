const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class FcPrettierConfigVersionMatch {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(this.directory, 'package.json');
        this.result = {
            group: 'prettier',
            name: 'fc-prettier-config-version-match',
            directory: directory,
            description: 'Does the @fashioncloud/prettier-config package match the version?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const packageVersion = devDependencies && devDependencies['@fashioncloud/prettier-config'];
            if (packageVersion === `^1.0.2`) {
                this.result.passCheck = true;
            }

            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            await promisify(exec)(`npm uninstall @fashioncloud/prettier-config`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev @fashioncloud/prettier-config@1.0.2`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = FcPrettierConfigVersionMatch;

