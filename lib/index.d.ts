
/**
 * @module watson-stt-experiment
 */

declare class STT {
    constructor(options: STTOptions)
    runExperiment(options: RunExperimentOptions): Promise<ExperimentResults>
}

interface STTOptions {
    url: string
    version: string
    apikey: string
    getAudio?: (audioID: string) => any
}

interface Transcription {
    audio: string
    transcript: string
}

interface RunExperimentOptions {
    groundTruth: Transcription[]
    model: string
    customizationId: string
    acousticCustomizationId: string
}

interface Change {
    type: string
    phrase: string
    with: string
}

interface TranscriptionResult {
    file: string
    text: string
    prediction: string
    word_error_rate: number
    changes: Change[]
}

interface ExperimentResults {
    total_words: number
    word_error_rate: number
    sentence_error_rate: number
    transcriptions: TranscriptionResult[]
}


export = STT