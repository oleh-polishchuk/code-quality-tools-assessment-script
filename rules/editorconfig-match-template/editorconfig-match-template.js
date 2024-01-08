const fs = require('fs');
const path = require('path');

class EditorconfigMatchTemplate {

    constructor(directory) {
        this.directory = directory;
        this.configPath = path.join(this.directory, '.editorconfig');
        this.corporateTemplateConfigFilePath = path.join(__dirname, 'templates', '.editorconfig');
        this.result = {
            group: 'editorconfig',
            directory: this.directory,
            description: 'Does the .editorconfig config file match the corporate template?',
            passCheck: false,
        };
    }

    check() {
        try {
            const config = fs.readFileSync(this.configPath, 'utf8');
            const corporateTemplateConfig = fs.readFileSync(this.corporateTemplateConfigFilePath, 'utf8');
            this.result.passCheck = config === corporateTemplateConfig;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }

    fix() {
        try {
            const corporateTemplateConfig = fs.readFileSync(this.corporateTemplateConfigFilePath, 'utf8');
            fs.writeFileSync(this.configPath, corporateTemplateConfig);
            this.result.passCheck = true;
            return [this.result];
        } catch (e) {
            // console.error(e);
            return [this.result];
        }
    }
}

module.exports = EditorconfigMatchTemplate;
