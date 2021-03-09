const fs = require('fs')
const { lookup } = require('mime-types')
const { IamAuthenticator } = require('ibm-watson/auth')
const STTV1 = require('ibm-watson/speech-to-text/v1')
const Experiment = require('marcao-wer')


module.exports = class STT {
    constructor(options) {
        this.v1 = new STTV1({
            url: options.url,
            version: options.version,
            authenticator: new IamAuthenticator({ apikey: options.apikey })
        })
        this.options = options
    }

    async runExperiment(options) {
        const experiment = new Experiment({
            recognize: file => this.v1.recognize({
                audio: fs.createReadStream(file),
                contentType: lookup(file) || 'audio/ogg;codecs=opus',
                model: options.model,
                customizationId: options.customizationId,
                acousticCustomizationId: options.acousticCustomizationId
            })
                .then(sttData => sttData.result.results[0] ? sttData.result.results[0].alternatives[0].transcript.trim() : '')
            ,
            verbose: true,
            ...options,
        })
        return experiment.run()
    }

}