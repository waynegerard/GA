import { writeFileSync } from 'fs'
import sha1 from 'js-sha1'
import tmp from 'tmp'
import { Storage, GetSignedUrlConfig, GetSignedUrlResponse } from '@google-cloud/storage'
import speech from '@google-cloud/speech'
import { TextToSpeechClient } from '@google-cloud/text-to-speech/build/src/v1beta1'
import dialogflow from 'dialogflow'
import logger from '../util/logger'
import analytics from '../util/analytics'


const bucketName = "io-production"


module Google {
  export type parseResponse = {
    contents: string
    queryResult: any
  }

  export type DFParseRequest = {
    query: string
    projectId: string
    sessionId: string
  }

  export type DFQueryResult = {
    intent: {
      displayName: string
    }
    intentDetectionConfidence: number
    knowledgeAnswers: {
      answers: {
        answer: string
        matchConfidence: number
      }[]
    },
    parameters: any,
    fulfillmentMessages: any[]
  }


  export const transcribe = async (audioBytes: string, encoding: string, sampleRate: number): Promise<string> => {
    const startTime = Date.now()

    const client = new speech.SpeechClient()

    const audio = {
      content: audioBytes,
    }

    const config = {
      encoding,
      sampleRateHertz: sampleRate,
      languageCode: 'en-US',
    }

    const request: any = {
      audio,
      config,
    }

    // Detects speech in the audio file, returns the first transcription line
    const [response] = await client.recognize(request)
    const firstTranscriptionLine = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n')

    const endTime = Date.now()

    analytics.track({
      event: "Performance for transcription",
      userId: "NaN",
      properties: {
        start: startTime,
        end: endTime,
        elapsed: endTime - startTime,
      },
    })

    return firstTranscriptionLine
  }

  export const speak = async (text: string): Promise<string> => {
    const digest = sha1(text)
    const key = `responses/${digest}.opus`
    const storage = new Storage()

    const existingFile = await storage.bucket(bucketName).file(key)
    const [fileExists] = await existingFile.exists()
    const signedUrlOptions: GetSignedUrlConfig = {
      action: "read",
      expires: "01-01-2030",
    };

    if (fileExists) {
      const [url] = await existingFile.getSignedUrl(signedUrlOptions)
      logger.info(`Found existing response, returning: ${url}`)
      return url
    }

    const client = new TextToSpeechClient();

    const request: any = {
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'OGG_OPUS' },
    };

    const [response] = await client.synthesizeSpeech(request);

    const tmpobj = tmp.fileSync();
    writeFileSync(tmpobj.name, response.audioContent, 'binary')
    await storeFile(tmpobj.name, key)
    const newFile = await storage.bucket(bucketName).file(key)
    const [signedUrl]: GetSignedUrlResponse = await newFile.getSignedUrl(signedUrlOptions)
    return signedUrl
  }

  export const storeFile = (srcFilePath: string, destination: string): Promise<any> => {
    const storage = new Storage();

    return storage.bucket(bucketName).upload(srcFilePath, { destination })
  }

  export const dialogflowRequest = async (request: DFParseRequest): Promise<DFQueryResult> => {
    const startTime = Date.now()
    const df = dialogflow.v2beta1;

    // Create a new session
    const sessionClient = new df.SessionsClient();
    const sessionPath = sessionClient.sessionPath(request.projectId, request.sessionId);
    const languageCode = "en-US"

    // The audio query request
    const dfrequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: request.query,
          languageCode,
        },
      },
    };

    const responses = await sessionClient.detectIntent(dfrequest);

    const endTime = Date.now()

    analytics.track({
      event: "Performance for dialogflow request",
      userId: "NaN",
      properties: {
        start: startTime,
        end: endTime,
        elapsed: endTime - startTime,
      },
    })

    return responses[0].queryResult
  }
}

export default Google
