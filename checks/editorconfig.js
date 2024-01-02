const fs = require('fs');
const path = require('path');

function checkIsConfigFilePresent(directory) {
    const configFilePath = path.join(directory, '.editorconfig');
    const isPresent = fs.existsSync(configFilePath);
    return [{
        tool: 'editorconfig',
        directory: directory,
        question: 'Is the .editorconfig config file present?',
        answer: isPresent,
    }];
}

function checkDoesConfigFileMatchCorporateTemplate(directory, corporateTemplatesPath) {
    const result = {
        tool: 'editorconfig',
        directory: directory,
        question: 'Does the .editorconfig config file match the corporate template?',
        answer: false,
    };

    const configFilePath = path.join(directory, '.editorconfig');
    const corporateTemplateConfigFilePath = path.join(corporateTemplatesPath, '.editorconfig');

    const isPresent = fs.existsSync(configFilePath);
    if (!isPresent) {
        return [result];
    }

    const config = fs.readFileSync(configFilePath, 'utf8');
    const isCorporateTemplatePresent = fs.existsSync(corporateTemplateConfigFilePath);
    if (!isCorporateTemplatePresent) {
        return [result];
    }

    const corporateTemplateConfig = fs.readFileSync(corporateTemplateConfigFilePath, 'utf8');
    result.answer = config === corporateTemplateConfig;
    return [result];
}

function check(directory) {
    return [
        ...checkIsConfigFilePresent(directory),
        ...checkDoesConfigFileMatchCorporateTemplate(directory, path.join(__dirname, '../corporate-templates')),
    ]
}

module.exports = {
    check: check
}
