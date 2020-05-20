module Constants {

  export const DISCORD_AUDIO_SAMPLE_RATE = 48000
  export const {
 DISCORD_TOKEN, AWS_LOG_STREAM, AWS_LOG_ACCESS_KEY_ID, AWS_LOG_SECRET_KEY, SEGMENT_KEY, DATABASE_URL, SKILL_SERVICE_URL,
} = process.env

}

if (process.env.NODE_ENV !== "test") {
  const envVariables = ["DISCORD_TOKEN", "AWS_LOG_STREAM", "AWS_LOG_ACCESS_KEY_ID",
    "AWS_LOG_SECRET_KEY", "SEGMENT_KEY", "DATABASE_URL", "SKILL_SERVICE_URL"]
  envVariables.forEach((variable: string) => {
    if (!Constants[variable]) {
      console.error(`Required environment variable not defined: ${variable}. Check your .env.local file.`)
      process.exit(1)
    }
  })
}

export default Constants
