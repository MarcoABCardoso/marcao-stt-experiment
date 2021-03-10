#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const STT = require('../lib')
const fs = require('fs')

async function main() {
    const stt = new STT({ ...options, verbose: true })
    let results = await stt.runExperiment(options)
    fs.writeFileSync(options.output, JSON.stringify(results, null, 4))
}

let args = [
    { name: 'help', alias: 'h', type: Boolean, defaultValue: false, description: 'Print usage instructions.' },
    { name: 'url', alias: 'u', type: String, description: 'Watson STT base URL.' },
    { name: 'apikey', alias: 'a', type: String, description: 'Watson STT API Key.' },
    { name: 'filePath', alias: 'f', type: String, description: 'CSV file with columns [audioFilePath, transcript]' },
    { name: 'model', alias: 'm', type: String, description: 'Watson STT base model ID.' },
    { name: 'customizationId', alias: 'c', type: String, description: 'Language customization ID' },
    { name: 'acousticCustomizationId', alias: 'd', type: String, description: 'Acoustic customization ID' },
    { name: 'version', alias: 'v', type: String, defaultValue: '2020-07-01', description: 'Watson STT API version. Default: 2020-07-01' },
    { name: 'output', alias: 'o', type: String, defaultValue: 'results.json', description: 'Output file. Default: results.json' },
]
const sections = [
    { header: 'Marcão WER Evaluation Script', content: 'Runs WER evaluation on Watson Speech-to-text Model.' },
    { header: 'Options', optionList: args },
    { header: 'Output', content: 'WER Evaluation results in JSON format' },
]
const options = commandLineArgs(args)

if (options.help || (
    !options.apikey ||
    !options.filePath ||
    !options.model ||
    !options.url
))
    console.log(commandLineUsage(sections))
else
    main()