module Constants {

  export const {
 AWS_LOG_STREAM, AWS_LOG_ACCESS_KEY_ID, AWS_LOG_SECRET_KEY, SEGMENT_KEY, DATABASE_URL,
} = process.env

}

if (process.env.NODE_ENV !== "test") {
  const envVariables = ["AWS_LOG_STREAM", "AWS_LOG_ACCESS_KEY_ID",
    "AWS_LOG_SECRET_KEY", "SEGMENT_KEY", "DATABASE_URL"]
  envVariables.forEach((variable: string) => {
    if (!Constants[variable]) {
      console.error(`Required environment variable not defined: ${variable}. Check your .env.local file.`)
      process.exit(1)
    }
  })
}

export default Constants
