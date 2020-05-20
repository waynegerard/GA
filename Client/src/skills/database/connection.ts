import "reflect-metadata";
import { createConnection, Connection } from "typeorm"
import Constants from "../../util/constants"
import LearnModel from "../learn/model"
import logger from '../../util/logger'

let connection: Connection

const getConnection = async (): Promise<Connection> => {
  if (!connection) {
    logger.info("Establishing database connection...")
    try {
      connection = await createConnection({
        type: "postgres",
        url: Constants.DATABASE_URL,
        entities: [
            LearnModel,
        ],
        synchronize: true,
        logging: false,
      })
      logger.info("Database connection live!")
    } catch (e) {
      logger.error(e.message)
    }
  }
  return connection
}

getConnection()

export default getConnection
