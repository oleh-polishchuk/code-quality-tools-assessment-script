const fs = require('fs');
const path = require('path');

class TSLintPackageJsonScriptsExist {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'tslint',
            directory: directory,
            description: 'Are the tslint package.json scripts present?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const scripts = packageJson.scripts;
            if (scripts['tslint'] && scripts['tslint:fix']) {
                this.result.passCheck = true;
            }
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }

    async fix() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            packageJson.scripts = {
                'tslint': 'tslint \'app/**/*.ts\'',
                'tslint:fix': 'tslint \'app/**/*.ts\' --fix',
            }
            fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2));
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = TSLintPackageJsonScriptsExist;
