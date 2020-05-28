module Constants {

  export const DISCORD_AUDIO_SAMPLE_RATE = 48000
  export const {
 DISCORD_TOKEN
} = process.env

}

if (process.env.NODE_ENV !== "test") {
  const envVariables = ["DISCORD_TOKEN"]
  envVariables.forEach((variable: string) => {
    if (!Constants[variable]) {
      console.error(`Required environment variable not defined: ${variable}. Check your .env.local file.`)
      process.exit(1)
    }
  })
}

export default Constants
