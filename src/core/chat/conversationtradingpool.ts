import {
  ConversationTradingPoolInitConfig,
  EngineInitConfig,
} from "../../types"
import { ConversationTradingPoolSchema } from "../../interfaces/chat/schema"
import { Maybe } from "../../types/base"
import { Engine } from "./engine"
import { Crypto } from "./crypto"

/**
 * Represents a Conversation Trading Pool that extends the Engine class and implements the ConversationTradingPoolSchema interface.
 * @class ConversationTradingPool
 * @extends Engine
 * @implements ConversationTradingPoolSchema
 */

export class ConversationTradingPool
  extends Engine
  implements ConversationTradingPoolSchema
{
  /**
   * @property id - The unique identifier of the operation.
   */
  readonly id: string
  /**
   * @property conversationId - The ID of the conversation related to the operation.
   */
  readonly conversationId: Maybe<string>
  /**
   * @property userId - The ID of the user associated with the operation.
   */
  readonly userId: Maybe<string>
  /**
   * @property creatorsIds - An array of IDs of the creators involved in the operation.
   */
  readonly creatorsIds: Maybe<Array<string>>
  /**
   * @property initializatorsIds - An array of IDs of the initializers involved in the operation.
   */
  readonly initializatorsIds: Maybe<Array<string>>
  /**
   * @property operation - Additional JSON data related to the operation.
   */
  readonly operation: Maybe<string>
  /**
   * @property status - The current status of the operation (TRADE_INITIALIZED, TRADE_CONFIRMED, TRADE_PROGRESS, TRADE_COMPLETED).
   */
  readonly status: Maybe<
    | "TRADE_INITIALIZED"
    | "TRADE_CONFIRMED"
    | "TRADE_PROGRESS"
    | "TRADE_COMPLETED"
  >
  /**
   * @property type - The type of operation (RENT or TRADE).
   */
  readonly type: Maybe<"RENT" | "TRADE">
  /**
   * @property createdAt - The date of creation of the trading pool
   */
  readonly createdAt: Maybe<Date>
  /**
   * @property updatedAt - The last update's date of the trading pool
   */
  readonly updatedAt: Maybe<Date>
  /**
   * @property deletedAt - The deletion date of the trading pool
   */
  readonly deletedAt: Maybe<Date>

  /**
   * Constructor for ConversationTradingPool class.
   * @param {ConversationTradingPoolInitConfig & EngineInitConfig} config - The configuration object containing initialization parameters.
   * @returns None
   */
  constructor(config: ConversationTradingPoolInitConfig & EngineInitConfig) {
    super({
      apiKey: config.apiKey,
      storage: config.storage,
    })

    this.id = config.id
    this.conversationId = config.conversationId
    this.createdAt = config.createdAt
    this.creatorsIds = config.creatorsIds
    this.initializatorsIds = config.initializatorsIds
    this.deletedAt = config.deletedAt
    this.operation = config.operation
    this.status = config.status
    this.type = config.type
    this.updatedAt = config.updatedAt
    this.userId = config.userId
    this._client = config.client
  }

  getOperationDecrypted(): Maybe<JSON> {
    if (!this.conversationId || !this.operation) return null
    return JSON.parse(
      Crypto.decryptStringOrFail(
        this.findPrivateKeyById(this.conversationId),
        this.operation
      )
    )
  }
}
