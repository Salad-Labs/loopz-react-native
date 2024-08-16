import { ConnectedWallet } from "@privy-io/react-auth"
import { Maybe } from "@src/types"

export interface AccountSchema {
  did: string
  organizationId: string
  token: string
  walletAddress: string
  walletConnectorType: string
  walletImported: boolean
  walletRecoveryMethod: string
  walletClientType: string
  appleSubject: Maybe<string>
  appleEmail: Maybe<string>
  discordSubject: Maybe<string>
  discordEmail: Maybe<string>
  discordUsername: Maybe<string>
  farcasterFid: Maybe<number>
  farcasterDisplayName: Maybe<string>
  farcasterOwnerAddress: Maybe<string>
  farcasterPfp: Maybe<string>
  farcasterSignerPublicKey: Maybe<string>
  farcasterUrl: Maybe<string>
  farcasterUsername: Maybe<string>
  githubSubject: Maybe<string>
  githubEmail: Maybe<string>
  githubName: Maybe<string>
  githubUsername: Maybe<string>
  googleEmail: Maybe<string>
  googleName: Maybe<string>
  googleSubject: Maybe<string>
  instagramSubject: Maybe<string>
  instagramUsername: Maybe<string>
  linkedinEmail: Maybe<string>
  linkedinName: Maybe<string>
  linkedinSubject: Maybe<string>
  linkedinVanityName: Maybe<string>
  spotifyEmail: Maybe<string>
  spotifyName: Maybe<string>
  spotifySubject: Maybe<string>
  telegramFirstName: Maybe<string>
  telegramLastName: Maybe<string>
  telegramPhotoUrl: Maybe<string>
  telegramUserId: Maybe<string>
  telegramUsername: Maybe<string>
  tiktokName: Maybe<string>
  tiktokSubject: Maybe<string>
  tiktokUsername: Maybe<string>
  twitterName: Maybe<string>
  twitterSubject: Maybe<string>
  twitterProfilePictureUrl: Maybe<string>
  twitterUsername: Maybe<string>
  dynamoDBUserID: string
  username: string
  email: string
  bio: string
  firstLogin: boolean
  avatarUrl: string
  phone: Maybe<string>
  isVerified: boolean
  isNft: boolean
  collectionAddress: string
  tokenId: Maybe<string>
  postNotificationPush: boolean
  postNotificationSystem: boolean
  dealNotificationPush: boolean
  dealNotificationSystem: boolean
  followNotificationPush: boolean
  followNotificationSystem: boolean
  collectionNotificationPush: boolean
  collectionNotificationSystem: boolean
  generalNotificationPush: boolean
  generalNotificationSystem: boolean
  accountSuspended: boolean
  allowNotification: boolean
  allowNotificationSound: boolean
  visibility: boolean
  onlineStatus: "OFFLINE" | "ONLINE" | "BUSY"
  allowReadReceipt: boolean
  allowReceiveMessageFrom: "NO_ONE" | "ONLY_FOLLOWED" | "EVERYONE"
  allowAddToGroupsFrom: "EVERYONE" | "ONLY_FOLLOWED"
  allowGroupsSuggestion: boolean
  e2ePublicKey: string
  e2eSecret: string
  e2eSecretIV: string
  createdAt: Date
  updatedAt: Maybe<Date>
  deletedAt: Maybe<Date>
  wallets(): Array<ConnectedWallet>
  setWallets(wallets: Array<ConnectedWallet>): void
}
