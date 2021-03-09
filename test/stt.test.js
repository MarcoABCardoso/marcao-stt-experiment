const STT = require('../lib')
const STTV1 = require('ibm-watson/speech-to-text/v1')

let sttOptions1 = {
    url: 'foo_url',
    apikey: 'foo_apikey',
    version: 'foo_version',
}

let runExperimentOptions = {
    audioFile: './test/_audioFile.zip',
    groundTruthFile: './test/_groundTruthFile.txt',
}

let sampleResults = require('./sample-results.json')
let v1Mock = {
    recognize: jest.fn(() => Promise.resolve({ result: { results: [{ alternatives: [{ transcript: 'Como trocar senha do banco' }] }] } }))
        .mockResolvedValueOnce({ result: { results: [] } })
}

describe('STT', () => {
    describe('#constructor', () => {
        let stt = new STT(sttOptions1)
        it('Creates an instance of STT using one instance', () => {
            expect(stt).toBeInstanceOf(STT)
        })
        it('Sets v1 to an instance of the Watson STT V1 SDK with the given parameters', () => {
            expect(stt.v1).toBeInstanceOf(STTV1)
            expect(stt.v1.baseOptions.url).toBe('foo_url')
            expect(stt.v1.baseOptions.version).toBe('foo_version')
            expect(stt.v1.authenticator.apikey).toBe('foo_apikey')
        })
    })

    describe('#runExperiment', () => {
        let stt = new STT(sttOptions1)
        it('Executes WER evaluation on an instance', (done) => {
            stt.v1 = v1Mock
            stt.runExperiment(runExperimentOptions)
                .catch(err => done.fail(err))
                .then(results => {
                    expect(results).toEqual(sampleResults)
                    done()
                })
        })
    })

})