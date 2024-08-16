import { PrivyClientConfig } from "../"
import { Auth } from "@src/auth"
import { Trade } from "@src/trade"

export interface PrivyAdapterProps {
  auth: Auth
  trade: Trade
  appId: string
  config: PrivyClientConfig
}
