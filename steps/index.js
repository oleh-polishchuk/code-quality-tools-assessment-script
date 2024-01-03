// Editorconfig steps
const EditorconfigFilePresentStep = require('./editorconfig-file-present.step');
const EditorconfigFileMatchesCorporateTemplateStep = require('./editorconfig-file-matches-corporate-template.step');

// Prettier steps
const PrettierFilePresentStep = require('./prettier-file-present.step');
const PrettierFileMatchesCorporateTemplateStep = require('./prettier-file-matches-corporate-template.step');
const PrettierignoreFilePresentStep = require('./prettierignore-file-present.step');
const PrettierignoreFileMatchesCorporateTemplateStep = require('./prettierignore-file-matches-corporate-template.step');
const PrettierPackageInstalledStep = require('./prettier-package-installed.step');
const PrettierPackageMatchesLatestSupportedVersionStep = require('./prettier-package-matches-latest-supported-version.step');
const UnneededTypesPrettierPackageUninstalledStep = require('./unneeded-types-prettier-package-uninstalled.step');

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
    PrettierPackageMatchesLatestSupportedVersionStep,
    UnneededTypesPrettierPackageUninstalledStep,

    // TSLint steps

}
