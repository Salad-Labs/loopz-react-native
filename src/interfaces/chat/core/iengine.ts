import { KeyPairItem } from "../../../types/chat/keypairitem"
import { SubscriptionGarbage } from "../../../types/chat/subscriptiongarbage"
import { Maybe } from "../../../types/base"
import forge from "node-forge"

/**
 * Interface for an Engine that defines methods for connecting, reconnecting, collecting garbage,
 * refreshing JWT token, and getting API related information.
 * @interface IEngine
 */
export interface IEngine {
  connect(callback: Function): void
  reconnect(callback: Function): void
  collect(garbage: Array<SubscriptionGarbage> | SubscriptionGarbage): void
  refreshJWTToken(jwt: string): void
  getJWTToken(): Maybe<string>
  getApiKey(): Maybe<string>
  getApiURL(): Maybe<string>
  getRealtimeApiURL(): Maybe<string>
  addKeyPairItem(newItem: KeyPairItem): Array<KeyPairItem>
  removeKeyPairItem(id: string): Array<KeyPairItem>
  setKeyPairMap(map: Array<KeyPairItem>): void
  getKeyPairMap(): Array<KeyPairItem>
  findPublicKeyById(id: string): Maybe<forge.pki.rsa.PublicKey>
  findPrivateKeyById(id: Maybe<string>): Maybe<forge.pki.rsa.PrivateKey>
  findKeyPairById(id: string): Maybe<forge.pki.rsa.KeyPair>
  setUserKeyPair(userKeyPair: forge.pki.rsa.KeyPair): void
  getUserKeyPair(): Maybe<forge.pki.rsa.KeyPair>
}
