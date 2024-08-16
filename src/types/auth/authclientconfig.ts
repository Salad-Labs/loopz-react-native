import { Maybe } from "../../types/base"
import { RealmStorage } from "../../core/app"

/**
 * Represents the configuration options for an authentication client.
 */
export type AuthClientConfig = {
  storage?: Maybe<RealmStorage>
}
