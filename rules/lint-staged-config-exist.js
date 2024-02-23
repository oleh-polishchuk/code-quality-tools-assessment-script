const fs = require('fs');
const path = require('path');

class LintStagedConfigExist {
    constructor(directory) {
        this.directory = directory;
        this.packageJsonPath = path.join(directory, 'package.json');
        this.result = {
            group: 'prettier',
            name: 'lint-staged-config-exist',
            directory: directory,
            description: 'Are the lint-staged package.json scripts installed?',
            passCheck: false,
        };
    }

    check() {
        try {
            const packageJsonContent = fs.readFileSync(this.packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            const lintStagedConfig = packageJson['lint-staged'];
            const lintStagedAppConfig = lintStagedConfig && lintStagedConfig['app/**/*.ts'];
            const lintStagedTestsConfig = lintStagedConfig && lintStagedConfig['tests/**/*.ts'];
            if (lintStagedAppConfig && lintStagedTestsConfig) {
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
            packageJson['lint-staged'] = packageJson['lint-staged'] || {};
            packageJson['lint-staged']['app/**/*.ts'] = packageJson['lint-staged']['app/**/*.ts'] || 'prettier --write --config ./.prettierrc.js';
            packageJson['lint-staged']['tests/**/*.ts'] = packageJson['lint-staged']['tests/**/*.ts'] || 'prettier --write --config ./.prettierrc.js';
            fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2));
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            return [this.result];
        }
    }
}

module.exports = LintStagedConfigExist;
