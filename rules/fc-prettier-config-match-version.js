const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class FcPrettierConfigMatchVersion {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(this.directory, 'package.json');
        this.fcPackage = '@fashioncloud/prettier-config';
        this.fcPackageVersion = '1.0.2';
        this.result = {
            group: 'prettier',
            directory: directory,
            description: 'Does the @fashioncloud/prettier-config package matches the latest supported version?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const devDependencies = packageJson.devDependencies;

            const prettierConfigVersion = devDependencies && devDependencies[this.fcPackage];
            if (prettierConfigVersion === `^${this.fcPackageVersion}`) {
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
            await promisify(exec)(`npm uninstall ${this.fcPackage}`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev ${this.fcPackage}@${this.fcPackageVersion}`, { cwd: this.directory });
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = FcPrettierConfigMatchVersion;

