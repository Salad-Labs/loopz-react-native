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

  private constructor(config: LoopzConfig, runAdapter?: boolean) {
    Loopz._apiKey = config.apiKey
    Loopz._privyAppId = config.privyAppId
    Loopz._privyClientConfig = config.privyClientConfig
    Loopz._storage = config.storage
    Loopz._randomLsname = `loopz_${uuid()}`

    if (runAdapter === true || typeof runAdapter === "undefined") {
      if (typeof window === "undefined")
        throw new Error("Adapter must be runned only in desktop environments.")
      if (typeof window !== "undefined")
        Loopz._privyAdapter = new PrivyAdapter({
          appId: config.privyAppId,
          options:
            typeof window === "undefined"
              ? undefined
              : config.privyClientConfig,
        })
    }

    Loopz._oracle = new Oracle({
      apiKey: config.apiKey,
    })
    Loopz._post = new Post({
      apiKey: config.apiKey,
    })
    Loopz._trade = new Trade({
      apiKey: config.apiKey,
    })
    Loopz._chat = new Chat({
      apiKey: Loopz._apiKey,
      storage: config.storage,
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
    })

    if (Loopz._privyAdapter)
      Loopz._privyAdapter.render(Loopz._auth, Loopz._trade)
  }

  private static async createOrConnectToStorage(): Promise<RealmStorage> {
    return RealmStorage.createOrConnect()
  }

  static async boot(
    config: Omit<LoopzConfig, "storage">,
    options: { runAdapter?: boolean; enableStorage?: boolean }
  ): Promise<Loopz> {
    if (!Loopz._instance) {
      const { runAdapter, enableStorage } = options
      const storage = await Loopz.createOrConnectToStorage()

      //storage is enabled by default
      if (typeof enableStorage !== "undefined" && enableStorage === false)
        storage.disableStorage()

      Loopz._instance = new Loopz(
        {
          ...config,
          storage,
        },
        runAdapter
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
