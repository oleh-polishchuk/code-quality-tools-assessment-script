const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const exec = require('child_process').exec;

class FashioncloudPrettierConfigPackageMatchesLatestSupportedVersionStep {
    constructor(directory) {
        this.directory = directory;
        this.result = {
            tool: 'prettier',
            directory: directory,
            question: 'Does the @fashioncloud/prettier-config package matches the latest supported version?',
            answer: false,
        };
    }

    check() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.directory, 'package.json'), 'utf8'));
            const devDependencies = packageJson.devDependencies;

            const prettierConfigVersion = devDependencies && devDependencies['@fashioncloud/prettier-config'];
            if (prettierConfigVersion === '^1.0.2') {
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
            await promisify(exec)(`npm uninstall @fashioncloud/prettier-config`, { cwd: this.directory });
            await promisify(exec)(`npm install --save-dev @fashioncloud/prettier-config@1.0.2`, { cwd: this.directory });
            this.result.answer = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = FashioncloudPrettierConfigPackageMatchesLatestSupportedVersionStep;

