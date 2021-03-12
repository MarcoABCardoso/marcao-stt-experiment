const STT = require('../lib')
const STTV1 = require('ibm-watson/speech-to-text/v1')

let sttOptions = {
    url: 'foo_url',
    apikey: 'foo_apikey',
    version: 'foo_version', getAudio: id => `foo_audio_from_id_${id}`,
}

let runExperimentOptions = {
    groundTruth: require('./ground-truth.json'),
    model: 'foo_model',
    customizationId: 'foo_customization_id',
    acousticCustomizationId: 'foo_acoustic_customization_id'
}

let sampleResults = require('./sample-results.json')
let v1Mock = {
    recognize: jest.fn(() => Promise.resolve({ result: { results: [{ alternatives: [{ transcript: 'Como trocar senha do banco' }] }] } }))
        .mockResolvedValueOnce({ result: { results: [] } })
}

describe('STT', () => {
    describe('#constructor', () => {
        let stt = new STT(sttOptions)
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
        let stt = new STT(sttOptions)
        it('Executes WER evaluation on an instance', (done) => {
            stt.v1 = v1Mock
            stt.runExperiment(runExperimentOptions)
                .catch(err => done.fail(err))
                .then(results => {
                    expect(results).toEqual(sampleResults)
                    expect(v1Mock.recognize).toHaveBeenCalledTimes(5)
                    expect(v1Mock.recognize).toHaveBeenCalledWith({ 'audio': 'foo_audio_from_id_test/test_audio/audio_1.mp3', 'contentType': 'audio/mpeg', 'model': 'foo_model', 'customizationId': 'foo_customization_id', 'acousticCustomizationId': 'foo_acoustic_customization_id', })
                    expect(v1Mock.recognize).toHaveBeenCalledWith({ 'audio': 'foo_audio_from_id_test/test_audio/audio_2.mp3', 'contentType': 'audio/mpeg', 'model': 'foo_model', 'customizationId': 'foo_customization_id', 'acousticCustomizationId': 'foo_acoustic_customization_id', })
                    expect(v1Mock.recognize).toHaveBeenCalledWith({ 'audio': 'foo_audio_from_id_test/test_audio/audio_3.mp3', 'contentType': 'audio/mpeg', 'model': 'foo_model', 'customizationId': 'foo_customization_id', 'acousticCustomizationId': 'foo_acoustic_customization_id', })
                    expect(v1Mock.recognize).toHaveBeenCalledWith({ 'audio': 'foo_audio_from_id_test/test_audio/audio_4.mp3', 'contentType': 'audio/mpeg', 'model': 'foo_model', 'customizationId': 'foo_customization_id', 'acousticCustomizationId': 'foo_acoustic_customization_id', })
                    expect(v1Mock.recognize).toHaveBeenCalledWith({ 'audio': 'foo_audio_from_id_test/test_audio/audio_5', 'contentType': 'audio/ogg;codecs=opus', 'model': 'foo_model', 'customizationId': 'foo_customization_id', 'acousticCustomizationId': 'foo_acoustic_customization_id', })
                    done()
                })
        })
    })

})