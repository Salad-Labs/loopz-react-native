import { RealmStorage } from "./core/app"
import { v4 as uuid } from "uuid"
import { Auth } from "./auth"
import { Chat } from "./chat"
import { Oracle } from "./oracle"
import { Post } from "./post"
import { Trade } from "./trade"
import { LoopzConfig } from "./types/app/loopzconfig"
import { PrivyClientConfig } from "../src/interfaces"
import { PrivyAdapter } from "./adapter"
import { Maybe } from "./types"

export class Loopz {
  private static _instance: Loopz
  private static _randomLsname: string

  private static _auth: Auth
  private static _chat: Chat
  private static _oracle: Oracle
  private static _post: Post
  private static _trade: Trade

  private static _apiKey: string

  private static _privyAppId: string

  private static _privyClientConfig: PrivyClientConfig

  private static _storage: RealmStorage

  private static _privyAdapter: Maybe<PrivyAdapter> = null

  private static _devMode: boolean = false

  private constructor(config: LoopzConfig, devMode?: boolean) {
    Loopz._apiKey = config.apiKey
    Loopz._privyAppId = config.privyAppId
    Loopz._privyClientConfig = config.privyClientConfig
    Loopz._storage = config.storage
    Loopz._randomLsname = `loopz_${uuid()}`

    if (typeof devMode !== "undefined" && devMode === true)
      Loopz._devMode = true

    Loopz._oracle = new Oracle({
      apiKey: config.apiKey,
      devMode: Loopz._devMode,
    })
    Loopz._post = new Post({
      apiKey: config.apiKey,
      devMode: Loopz._devMode,
    })
    Loopz._trade = new Trade({
      apiKey: config.apiKey,
      devMode: Loopz._devMode,
    })
    Loopz._chat = new Chat({
      apiKey: Loopz._apiKey,
      storage: config.storage,
      devMode: Loopz._devMode,
    })
    Loopz._auth = new Auth({
      apiKey: config.apiKey,
      privyAppId: config.privyAppId,
      privyConfig: config.privyClientConfig,
      oracle: Loopz._oracle,
      post: Loopz._post,
      trade: Loopz._trade,
      chat: Loopz._chat,
      storage: config.storage,
      devMode: Loopz._devMode,
    })
  }

  private static async createOrConnectToStorage(): Promise<RealmStorage> {
    return RealmStorage.createOrConnect()
  }

  static async boot(
    config: Omit<LoopzConfig, "storage">,
    options: { devMode?: boolean; enableStorage?: boolean }
  ): Promise<Loopz> {
    if (!Loopz._instance) {
      let enableStorage = undefined
      let devMode = undefined

      if (options && "enableStorage" in options)
        enableStorage = options.enableStorage
      if (options && "devMode" in options) devMode = options.devMode

      const storage = await Loopz.createOrConnectToStorage()

      //storage is enabled by default
      if (typeof enableStorage !== "undefined" && enableStorage === false)
        storage.disableStorage()

      Loopz._instance = new Loopz(
        {
          ...config,
          storage,
        },
        devMode
      )
    }

    return Loopz._instance
  }

  init(): { auth: Auth; trade: Trade; post: Post; oracle: Oracle; chat: Chat } {
    return {
      auth: Loopz._auth,
      trade: Loopz._trade,
      post: Loopz._post,
      oracle: Loopz._oracle,
      chat: Loopz._chat,
    }
  }
}
