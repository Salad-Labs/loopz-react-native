import { Maybe } from "../../../types/base"

/**
 * Defines the schema for a conversation member.
 * @interface ConversationMemberSchema
 */
export interface ConversationMemberSchema {
  /**
   * @property {string} id - The unique identifier of the conversation member.
   */
  id: string
  /**
   * @property {string} conversationId - The ID of the conversation the member belongs to, if available.
   */
  conversationId: string
  /**
   * @property {string} userId - The ID of the user who is a member of the conversation.
   */
  userId: string
  /**
   * @property {"USER" | "ADMINISTRATOR"} type - The type of the conversation member, either "USER" or "ADMINISTRATOR".
   */
  type: "USER" | "ADMINISTRATOR"
  /**
   * @property {string} encryptedConversationPublicKey - The public key used for encrypting messages in the conversation.
   */
  encryptedConversationPublicKey: string
  /**
   * @property {string} encryptedConversationPrivateKey - The private key used for decrypting messages in the conversation.
   */
  encryptedConversationPrivateKey: string
  /**
   * @property { Date} createdAt - The creation date of the current object.
   */
  createdAt: Date
}
