import { PrivyClientConfig } from "../../interfaces"
import { RealmStorage } from "@src/core/app"

export type LoopzConfig = {
  apiKey: string
  privyAppId: string
  privyClientConfig: PrivyClientConfig
  storage: RealmStorage
}
