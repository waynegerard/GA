import Server from './server/server'

try {
  Server.listen(3000, "0.0.0.0")
  console.log("Server online")
} catch (e) {
  console.log("Received generic error! Error: ", e)
}

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
})

process.on('uncaughtException', (err: Error) => {
  console.info('Uncaught exception: ')
  console.error(err)
})
