#!/usr/bin/env node

const utils = require('./utils');
const { EditorconfigPlan, PrettierPlan, TSLintPlan } = require('./plans');
const path = require("path");

async function main() {
    // prepare
    const fix = process.argv.includes('--fix');
    const results = [];

    // process
    const directories = utils.getDirectories();
    for (const directory of directories) {
        console.log(`Checking ${directory}`);

        const corporateTemplatesPath = path.join(__dirname, 'corporate-templates');

        const editorconfigPlan = new EditorconfigPlan(directory, corporateTemplatesPath, fix);
        const prettierPlan = new PrettierPlan(directory, corporateTemplatesPath, fix);
        const tslintPlan = new TSLintPlan(directory, corporateTemplatesPath, fix);

        // results.push(...await editorconfigPlan.execute());
        results.push(...await prettierPlan.execute());
        // results.push(...await tslintPlan.execute());
    }

    // write results
    const resultPath = utils.writeToCSV(results);

    console.log('Done!');
    console.log(`Results written to ${resultPath}`);

}

main()
    .then(() => {
        console.log('Done!');
    })
    .catch((err) => {
        console.error(err);
    });
