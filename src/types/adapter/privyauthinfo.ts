import { User as PrivyUser } from "@privy-io/expo"
import { LinkedAccountWithMetadata, LoginMethod } from "@src/types/adapter"

export type PrivyAuthInfo = {
  user: PrivyUser
  isNewUser: boolean
  wasAlreadyAuthenticated: boolean
  loginMethod: LoginMethod
  linkedAccount: LinkedAccountWithMetadata
  authToken: string
}
