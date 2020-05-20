import Google from '../services/google'

const intentMap = {
  "Play Sound": (request: any) => request.sounds,
}

module DFParser {
  export const parseQueryResult = async (queryResult: Google.DFQueryResult): Promise<string> => {
    const intent = queryResult.intent.displayName
    const intentConfidence = queryResult.intentDetectionConfidence

    // Don't do anything if we have a low confidence result.
    // This number is totally arbitrary.
    if (intentConfidence < 0.6) {
      return ""
    }

    // Extract the parameters out of the request
    const params = queryResult.parameters
    const { fields } = params
    const request = {}
    Object.keys(fields).forEach((fieldName: string) => {
      if (fields[fieldName].kind === "stringValue") {
        request[fieldName] = fields[fieldName].stringValue
      } else if (fields[fieldName].kind === "listValue") {
        request[fieldName] = fields[fieldName].listValue.values[0].stringValue
      }
    })

    // Look to see if we have a matching intent for this
    if (!intentMap[intent]) {
      return ""
    }
    const answer = intentMap[intent](request)
    return answer
  }

  export const parse = async (request: Google.DFParseRequest): Promise<string> => {
    const queryResult = await Google.dialogflowRequest(request)
    const contents = await parseQueryResult(queryResult)
    if (!contents || contents === "") {
      return ""
    }

    // Turn it into a proper command
    return `ga ${contents}`
  }
}

export default DFParser
