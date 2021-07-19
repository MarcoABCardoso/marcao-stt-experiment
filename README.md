<h1 align="center">watson-stt-experiment</h1>
<p>
  <a href="https://www.npmjs.com/package/watson-stt-experiment" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/watson-stt-experiment.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href='https://coveralls.io/github/MarcoABCardoso/watson-stt-experiment?branch=master'>
    <img src='https://coveralls.io/repos/github/MarcoABCardoso/watson-stt-experiment/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href="#" target="_blank">
    <img alt="Node.js CI" src="https://github.com/MarcoABCardoso/watson-stt-experiment/workflows/Node.js%20CI/badge.svg" />
  </a>
</p>

> Runs word-error-rate evaluation on Watson STT Model

## Install

```sh
npm install -g watson-stt-experiment
```

## Usage

CLI:
```sh
> watson-stt-experiment

Marcão WER Evaluation Script

  Runs WER evaluation on Watson Speech-to-text Model. 

Options

  -h, --help                             Print usage instructions.                         
  -u, --url string                       Watson STT base URL.                              
  -a, --apikey string                    Watson STT API Key.                               
  -f, --filePath string                  CSV file with columns [audio, transcript] 
  -m, --model string                     Watson STT base model ID.                         
  -c, --customizationId string           Language customization ID                         
  -d, --acousticCustomizationId string   Acoustic customization ID                         
  -v, --version string                   Watson STT API version. Default: 2020-07-01       
  -o, --output string                    Output file. Default: results.json                

Output

  WER Evaluation results in JSON format 
```

As a module:
```js
const STT = require('watson-stt-experiment')
const stt = new STT({ 
  version: '2020-07-01', 
  apikey: 'YOUR_WATSON_STT_API_KEY', 
  url: 'YOUR_WATSON_STT_SERVICE_URL'
})

let results = await stt.runExperiment({  
  groundTruth: [
    {
      audio: "some_dir/audio_1.mp3",
      transcript: "How to change my password"
    },
    {
      audio: "some_dir/audio_2.mp3",
      transcript: "How do I change my password"
    }
  ], 
  model: 'en-US_BroadbandModel'
})
```

## Sample results

```json
{
    "total_words": 11,
    "word_error_rate": 0.90909091,
    "sentence_error_rate": 0.5,
    "transcriptions": [
        {
            "file": "some_dir/audio_1.mp3",
            "text": "How to change my password",
            "prediction": "How to change my password",
            "word_error_rate": 0,
            "changes": []
        },
        {
            "file": "some_dir/audio_2.mp3",
            "text": "How do I change my password",
            "prediction": "How I change my password",
            "word_error_rate": 0.16666666666666666,
            "changes": [
                {
                    "type": "deletion",
                    "phrase": "do"
                }
            ]
        }
    ]
}
```
Supported change types are currently:
- addition
- deletion
- substitution

## Run tests

```sh
npm run test
```

## Author

👤 **Marco Cardoso**

* Github: [@MarcoABCardoso](https://github.com/MarcoABCardoso)
* LinkedIn: [@marco-cardoso](https://linkedin.com/in/marco-cardoso)

## Show your support

Give a ⭐️ if this project helped you!