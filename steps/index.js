// Editorconfig steps
const EditorconfigFilePresentStep = require('./editorconfig-file-present.step');
const EditorconfigFileMatchesCorporateTemplateStep = require('./editorconfig-file-matches-corporate-template.step');

// Prettier steps
const PrettierFilePresentStep = require('./prettier-file-present.step');
const PrettierFileMatchesCorporateTemplateStep = require('./prettier-file-matches-corporate-template.step');
const PrettierignoreFilePresentStep = require('./prettierignore-file-present.step');
const PrettierignoreFileMatchesCorporateTemplateStep = require('./prettierignore-file-matches-corporate-template.step');
const PrettierPackageInstalledStep = require('./prettier-package-installed.step');

// TSLint steps

module.exports = {
    // Editorconfig steps
    EditorconfigFilePresentStep,
    EditorconfigFileMatchesCorporateTemplateStep,

    // Prettier steps
    PrettierFilePresentStep,
    PrettierFileMatchesCorporateTemplateStep,
    PrettierignoreFilePresentStep,
    PrettierignoreFileMatchesCorporateTemplateStep,
    PrettierPackageInstalledStep,

    // TSLint steps

}
