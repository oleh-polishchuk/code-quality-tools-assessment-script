const AbstractPlan = require("./abstract.plan");
const {
    UnneededTypesPrettierPackageUninstalledStep,
    PrettierFilePresentStep,
    PrettierFileMatchesCorporateTemplateStep,
    PrettierignoreFilePresentStep,
    PrettierignoreFileMatchesCorporateTemplateStep,
    PrettierPackageInstalledStep,
    PrettierPackageMatchesLatestSupportedVersionStep,
    FashioncloudPrettierConfigPackageInstalledStep,
    FashioncloudPrettierConfigPackageMatchesLatestSupportedVersionStep,
    HuskyPackageInstalledStep,
    HuskyPackageMatchesLatestSupportedVersionStep,
} = require("../steps");

class PrettierPlan extends AbstractPlan {
    constructor(directory, corporateTemplatesPath, fix = false) {
        super();
        this.steps = [
            {
                name: 'Is the unneeded @types/prettier package uninstalled?',
                instance: new UnneededTypesPrettierPackageUninstalledStep(directory),
            },
            {
                name: 'Is the .prettierignore file present?',
                instance: new PrettierignoreFilePresentStep(directory),
                next: {
                    name: 'Does the .prettierignore file match the corporate template?',
                    instance: new PrettierignoreFileMatchesCorporateTemplateStep(directory, corporateTemplatesPath),
                }
            },
            {
                name: 'Is the prettier package installed?',
                instance: new PrettierPackageInstalledStep(directory),
                next: {
                    name: 'Does the prettier package matches the corporate template?',
                    instance: new PrettierPackageMatchesLatestSupportedVersionStep(directory),
                }
            },
            {
                name: 'Is the @fashioncloud/prettier-config package installed?',
                instance: new FashioncloudPrettierConfigPackageInstalledStep(directory),
                next: {
                    name: 'Does the @fashioncloud/prettier-config package matches the latest supported version?',
                    instance: new FashioncloudPrettierConfigPackageMatchesLatestSupportedVersionStep(directory),
                }
            },
            {
                name: 'Is the .prettierrc.js file present?',
                instance: new PrettierFilePresentStep(directory),
                next: {
                    name: 'Does the .prettierrc.js file match the corporate template?',
                    instance: new PrettierFileMatchesCorporateTemplateStep(directory, corporateTemplatesPath),
                }
            },
            {
                name: 'Is the husky package installed?',
                instance: new HuskyPackageInstalledStep(directory),
                next: {
                    name: 'Does the husky package matches the latest supported version?',
                    instance: new HuskyPackageMatchesLatestSupportedVersionStep(directory),
                }
            },
            // {
            //     name: 'Is the lint-staged package installed?',
            //     // instance: ,
            //     next: {
            //         name: 'Does the lint-staged package matches the latest supported version?',
            //         // instance: ,
            //     }
            // },

            // {
            //     name: 'Is the package.json scripts present?',
            //     // instance: ,
            // },
            // {
            //     name: 'Is the pre-commit hook created?',
            //     // instance: ,
            //     next: {
            //         name: 'Does the pre-commit hook matches the corporate template?',
            //         // instance: ,
            //     }
            // },
            // {
            //     name: 'Is the codebase formatted with prettier?',
            //     // instance: ,
            // }
        ];
        this.fix = fix;
    }
}

module.exports = PrettierPlan;
