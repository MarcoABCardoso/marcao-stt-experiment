const fs = require('fs')
const { lookup } = require('mime-types')
const { IamAuthenticator } = require('ibm-watson/auth')
const STTV1 = require('ibm-watson/speech-to-text/v1')
const Experiment = require('stt-evaluation')


class STT {
    constructor(options) {
        this.v1 = new STTV1({
            url: options.url,
            version: options.version,
            authenticator: new IamAuthenticator({ apikey: options.apikey })
        })
        this.config = {
            ...STT.getDefaultConfig(),
            ...options
        }
    }

    async runExperiment(options) {
        const experiment = new Experiment({
            recognize: async id => this.v1.recognize({
                audio: await this.config.getAudio(id),
                contentType: lookup(id) || 'audio/ogg;codecs=opus',
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

STT.getDefaultConfig = () => ({
    getAudio: fs.createReadStream,
})

module.exports = STT