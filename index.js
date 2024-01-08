#!/usr/bin/env node

const { program } = require('commander');
const { main } = require('./main');

program
    .argument('[directory]', 'Optional directory of the project you want to inspect. If not specified, the current directory is used.', process.cwd())
    .option('--fix', 'Fix project inconsistency in place. This is comparable to the eslint --fix workflow.')
    .option('--verbose', 'Show each checked rule even if it passes check. By default Code Inspector shows only the rules that have not passed inspection.')
    .option('--rule [name]', 'Check only the specified rule.')
    .option('--debug', 'Show debug information.')

program.parse(process.argv);

main(program.args[0], program.opts())
    .then((exitCode = 0) => {
        console.log('Done!');
        process.exit(exitCode);
    })
    .catch((err) => {
        console.error(err);
        process.exit(2);
    });
