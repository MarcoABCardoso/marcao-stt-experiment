
/**
 * @module marcao-stt-experiment
 */

declare class STT {
    /**
     * Construct an STT object.
     * @constructor
     */
    constructor(options: STTOptions)
    /**
     * Execute experiment
     */
    runExperiment(options: RunExperimentOptions): Promise<ExperimentResults>
}

interface STTOptions {
    url: string
    version: string
    apikey: string
}

interface RunExperimentOptions {
    model: string
    customizationId: string
    acousticCustomizationId: string
}

interface Change {
    type: string
    word: string
    with: string
}

interface Transcription {
    text: string
    prediction: string
    word_error_rate: number
    changes: Change[]
}

interface ExperimentResults {
    total_words: number
    word_error_rate: number
    sentence_error_rate: number
    transcriptions: Transcription[]
}


export = STT